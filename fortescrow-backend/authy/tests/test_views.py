import pytest

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token

from model_mommy import mommy

from authy.models import User, UserOTP
from authy.serializers import UserSerializer, BusinessSerializer


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user_with_token(api_client):
    user = User.objects.create_user(
        **{
            "email": "test@example.com",
            "password": "testpassword",
            "first_name": "John",
            "last_name": "Doe",
            "otp": 1234,
        }
    )

    # Generate the URL for the verify-otp endpoint using reverse
    verify_otp_url = reverse("verify-otp")

    # Make a POST request to the verify-otp endpoint with valid OTP
    api_client.post(verify_otp_url, data={"otp": 1234}, format="json")
    # Assume you have your endpoint URL
    url = reverse(
        "login"
    )  # Replace "login" with the actual name or URL of your signin view

    # Assuming your view requires some data in the request, adjust this based on your view requirements
    data = {
        "email": user.email,
        "password": "testpassword",
    }

    # Make a request to your view
    response = api_client.post(url, data, format="json")
    return user, response.get("token")


@pytest.mark.django_db
@pytest.mark.parametrize(
    "user_data, expected_status",
    [
        (
            {
                "email": "test@example.com",
                "password": "testpassword",
                "first_name": "John",
                "last_name": "Doe",
            },
            status.HTTP_201_CREATED,  # expected status code for successful creation
        ),
    ],
)
def test_signup_endpoint(api_client, user_data, expected_status):
    # Generate the URL for the signup endpoint using reverse
    signup_url = reverse("signup-list")

    # Make a POST request to the signup endpoint
    response = api_client.post(signup_url, data=user_data, format="json", secure=False)

    # Check if the response status code matches the expected status
    assert response.status_code == expected_status

    # Check if the user was created in the database if the status is 201
    if expected_status == status.HTTP_201_CREATED:
        assert User.objects.filter(email=user_data["email"]).exists()


@pytest.mark.django_db
def test_verify_otp_endpoint(api_client):
    # Create a user with a known OTP for testing
    user = mommy.make(User, otp=1234)

    # Generate the URL for the verify-otp endpoint using reverse
    verify_otp_url = reverse("verify-otp")

    # Make a POST request to the verify-otp endpoint with valid OTP
    response = api_client.post(verify_otp_url, data={"otp": 1234}, format="json")

    # Check if the response status code is 200 (OK) for successful verification
    assert response.status_code == status.HTTP_200_OK

    # Refresh the user instance to get the latest data from the database
    user.refresh_from_db()

    # Check if the user is now verified in the database
    assert user.is_verified

    # Check if the response message match the expected values
    assert response.data["message"] == "Successfully verified email, proceed to login"

    # Make another POST request to the verify-otp endpoint with an invalid OTP
    response_invalid_otp = api_client.post(
        verify_otp_url, data={"otp": 5678}, format="json"
    )

    # Check if the response status code is 400 (Bad Request) for invalid OTP
    assert response_invalid_otp.status_code == status.HTTP_400_BAD_REQUEST

    # Check if the response error message matches the expected value
    expected_error_message = "Invalid OTP!"
    assert response_invalid_otp.data == {"errors": expected_error_message}


@pytest.mark.django_db
def test_signin_view(api_client):
    client = APIClient()

    user = User.objects.create_user(
        **{
            "email": "test@example.com",
            "password": "testpassword",
            "first_name": "John",
            "last_name": "Doe",
            "otp": 1234,
        }
    )

    # Generate the URL for the verify-otp endpoint using reverse
    verify_otp_url = reverse("verify-otp")

    # Make a POST request to the verify-otp endpoint with valid OTP
    response = api_client.post(verify_otp_url, data={"otp": 1234}, format="json")
    # Assume you have your endpoint URL
    url = reverse(
        "login"
    )  # Replace "login" with the actual name or URL of your signin view

    # Assuming your view requires some data in the request, adjust this based on your view requirements
    data = {
        "email": user.email,
        "password": "testpassword",
    }

    # Make a request to your view
    response = client.post(url, data, format="json")
    # Check if the response status code is 200
    assert response.status_code == status.HTTP_200_OK
    # Check if the token is returned
    assert response.data.get("token") is not None


@pytest.mark.django_db
def test_logout_view(api_client, user_with_token):
    # user_with_token is a fixture that creates a user and retrieves an authentication token
    user, token = user_with_token

    # Ensure the user is initially authenticated
    api_client.force_authenticate(user=user)

    # Get the URL for the logout view
    logout_url = reverse("logout")

    # Make a POST request to log out the user
    response = api_client.post(logout_url)

    # Check if the response status code is 200
    assert response.status_code == status.HTTP_200_OK

    # Check if the authentication token is deleted
    assert not Token.objects.filter(key=token).exists()


@pytest.mark.django_db
def test_forgot_password_view(api_client):
    # Create a user using Model Bakery
    user = mommy.make(User, email="test@example.com")

    # Generate the URL for the forgot-password endpoint using reverse
    forgot_password_url = reverse("forgot-password")

    # Make a POST request to the forgot-password endpoint
    response = api_client.post(
        forgot_password_url, data={"email": "test@example.com"}, format="json"
    )

    # Check if the response status code is 200
    assert response.status_code == status.HTTP_200_OK

    # Check if the expected message is present in the response
    assert (
        "We have sent a password reset mail to your box if it exists"
        in response.data["message"]
    )

    # Check if the UserOTP object is created for the user
    assert UserOTP.objects.filter(user=user).exists()


@pytest.mark.django_db
def test_request_new_otp_view(api_client):
    # Create a user using Model Bakery
    user = mommy.make(User, email="test@example.com", is_verified=False)

    # Generate the URL for the request-new-otp endpoint using reverse
    request_new_otp_url = reverse("request-new-otp")

    # Make a POST request to the request-new-otp endpoint
    response = api_client.post(
        request_new_otp_url, data={"email": "test@example.com"}, format="json"
    )

    # Check if the response status code is 200
    assert response.status_code == status.HTTP_200_OK

    # Check if the expected message is present in the response
    assert "OTP sent to test@example.com successfully" in response.data["data"]

    # Check if the user's OTP is updated in the database
    user.refresh_from_db()
    assert user.otp is not None


@pytest.mark.django_db
def test_set_new_password_view(api_client):
    # Create a user and user OTP using Model Bakery
    user = mommy.make(User, email="test@example.com")
    user_otp = mommy.make(UserOTP, user=user)

    # Generate the URL for the set-new-password endpoint using reverse
    set_new_password_url = reverse(
        "set-new-password", kwargs={"token": user_otp.secret}
    )

    # Make a PATCH request to the set-new-password endpoint
    response = api_client.patch(
        set_new_password_url, data={"password": "newpassword"}, format="json"
    )

    # Check if the response status code is 200
    assert response.status_code == status.HTTP_200_OK

    # Check if the expected email and token are present in the response
    assert response.data.get("email") == user.email
    assert "token" in response.data

    # Check if the user's password is updated in the database
    user.refresh_from_db()
    assert user.check_password("newpassword")

    # Check if the user OTP is deleted in the database
    assert not UserOTP.objects.filter(secret=user_otp.secret).exists()


@pytest.mark.django_db
def test_business_registration_viewset(api_client):

    # Prepare the request data
    request_data = {
        "first_name": "Lorem",
        "last_name": "user",
        "password": "lorempass",
        "email": "test@example.com",
        "businesses": [{"name": "mmmol", "registration_number": "RC009099", "logo": None}],
    }

    # Generate the URL for the business-registration endpoint using reverse
    register_business_url = reverse("register-business-list")

    # Make a POST request to the business-registration endpoint
    response = api_client.post(register_business_url, data=request_data, format="json")
    # Check if the response status code is 201 (created)
    assert response.status_code == status.HTTP_201_CREATED
    busineses = request_data.pop("businesses")
    # Check if the user and business are created in the database
    business = response.data.pop("businesses")[0]
    
    assert busineses[0].get("name") == business.get("name")
