import pytest
from model_mommy import mommy
from authy.models import User, UserOTP, Profile, BUSINESS


@pytest.mark.django_db
def test_create_user():
    """
    Test creating a user using the model_mommy.make function.
    """
    user = mommy.make(User)
    assert user.first_name is not None
    assert user.last_name is not None
    assert user.password is not None
    assert user.email is not None
    assert user.user_type == BUSINESS
    assert user.first_login is True
    assert user.is_verified is False
    assert user.is_deleted is False


@pytest.mark.django_db
def test_create_user_with_otp():
    """
    Test creating a user with associated UserOTP using the model_mommy.make function.
    """
    user = mommy.make(User)
    user_otp = mommy.make(UserOTP, user=user)
    assert UserOTP.objects.count() == 1
    assert user_otp.user == user


@pytest.mark.django_db
def test_soft_delete_user():
    """
    Test soft deleting a user using the soft_delete method and checking the is_deleted status.
    """
    deleted_user = mommy.make(User)
    user2 = mommy.make(User)
    deleted_user.soft_delete(user=deleted_user, deleted_by=user2)
    assert deleted_user.is_deleted is True
    assert deleted_user.user == deleted_user
    assert deleted_user.deleted_by == user2
    assert User.objects.filter(is_deleted=True).count() == 1


@pytest.mark.django_db
def test_user_str_method():
    """
    Test the __str__ method of the User model.
    """
    user = mommy.make(User, email="test@example.com")
    assert str(user) == "test@example.com"


@pytest.mark.django_db
def test_create_user_profile():
    """
    Test creating a user profile using the model_mommy.make function.
    """
    user: User = mommy.make(User, email="test@example.com")

    assert user.profile.address is  None
    assert user.profile.user is not None
    assert user.profile.picture is None


@pytest.mark.django_db
def test_profile_str_method():
    """
    Test the __str__ method of the Profile model.
    """
    user: User = mommy.make(User, email="test@example.com")
    assert str(user.profile) == f"Profile for {user.email}"
