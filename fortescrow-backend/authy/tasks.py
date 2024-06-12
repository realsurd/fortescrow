import requests
from django.conf import settings

from celery import shared_task


base_url = settings.MAILGUN_BASE_URL
api_key = ("api", settings.MAILGUN_API_KEY)
sender = settings.MAILGUN_SENDER


email_style = """
    <style>
        body {
            font-family: 'Arial', sans-serif;
            color: #333333;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        
        .header {
            background-color: #26ADA4;
            color: #ffffff;
            text-align: center;
            padding: 20px 0;
        }

        .content {
            padding: 20px;
        }

        .footer {
            background-color: #26ADA4;
            color: #ffffff;
            text-align: center;
            padding: 10px 0;
        }
    </style>
"""


@shared_task
def send_account_activation_email(receiver, otp):
    body = f"""
        <div class="container">
            <div class="header" style="background-color: #26ADA4; color: #ffffff; text-align: center; padding: 20px 0;">
                <h2>pennypal: Account Verification Email</h2>
            </div>
            <div class="content" style="padding: 20px;">
                <p>Hi {receiver},</p>
                <p>Use the OTP below to verify your email:</p>
                <p><strong>{otp}</strong></p>
            </div>
            <div class="footer" style="background-color: #26ADA4; color: #ffffff; text-align: center; padding: 10px 0;">
                <p>Thank you for choosing pennypal.</p>
            </div>
        </div>
    """

    email_subject = "Pennypal: Account verification email"

    mailing_data = {
        "from": sender,
        "to": receiver,
        "subject": email_subject,
        "html": email_style + body,
    }

    return requests.post(base_url, auth=api_key, data=mailing_data)


@shared_task
def send_authorization_otp_mail(receiver, otp):
    body = f"""
        <div class="container">
            <div class="header" style="background-color: #26ADA4; color: #ffffff; text-align: center; padding: 20px 0;">
                <h2>pennypal: Authorization OTP</h2>
            </div>
            <div class="content" style="padding: 20px;">
                <p>Hi {receiver},</p>
                <p>Use the OTP below to proceed with the next action:</p>
                <p><strong>{otp}</strong></p>
            </div>
            <div class="footer" style="background-color: #26ADA4; color: #ffffff; text-align: center; padding: 10px 0;">
                <p>Thank you for using pennypal.</p>
            </div>
        </div>
    """

    email_subject = "Pennypal: Authorization OTP"

    mailing_data = {
        "from": sender,
        "to": receiver,
        "subject": email_subject,
        "html": email_style + body,
    }

    return requests.post(base_url, auth=api_key, data=mailing_data)


@shared_task
def send_forgot_password_email(receiver, otp):
    forgot_pass_url = f"https://www.pennypal.com.ng/forgot-password?email={receiver}"

    body = f"""
        <div class="container">
            <div class="header" style="background-color: #26ADA4; color: #ffffff; text-align: center; padding: 20px 0;">
                <h2>pennypal: Forgot Password Email</h2>
            </div>
            <div class="content" style="padding: 20px;">
                <p>Hi {receiver},</p>
                <p>Follow the link below to change your password:</p>
                <p><a href="{forgot_pass_url}" style="color: #26ADA4;">{forgot_pass_url}</a></p>
                <p>Your code is: <strong>{otp}</strong></p>
            </div>
            <div class="footer" style="background-color: #26ADA4; color: #ffffff; text-align: center; padding: 10px 0;">
                <p>Thank you for using pennypal.</p>
            </div>
        </div>
    """

    email_subject = "Pennypal: Forgot Password Email"

    mailing_data = {
        "from": sender,
        "to": receiver,
        "subject": email_subject,
        "html": email_style + body,
    }

    return requests.post(base_url, auth=api_key, data=mailing_data)


@shared_task
def send_account_verified_email(receiver):
    login_url = "https://www.pennypal.com.ng/login"

    body = f"""
        <div class="container">
            <div class="header" style="background-color: #26ADA4; color: #ffffff; text-align: center; padding: 20px 0;">
                <h2>pennypal: Email Verification Successful</h2>
            </div>
            <div class="content" style="padding: 20px;">
                <p>Hi {receiver},</p>
                <p>Your email has been successfully verified.</p>
                <p>Follow the link below to login to your account:</p>
                <p><a href="{login_url}" style="color: #26ADA4;">{login_url}</a></p>
            </div>
            <div class="footer" style="background-color: #26ADA4; color: #ffffff; text-align: center; padding: 10px 0;">
                <p>Thank you for choosing pennypal.</p>
            </div>
        </div>
    """

    email_subject = "Pennypal: Email Verification Successful"

    mailing_data = {
        "from": sender,
        "to": receiver,
        "subject": email_subject,
        "html": email_style + body,
    }

    return requests.post(base_url, auth=api_key, data=mailing_data)


@shared_task
def send_update_password_succcess_email(receiver):
    body = f"""
        <div style="background-color: #26ADA4; color: #ffffff; text-align: center; padding: 20px;">
            <h2>pennypal: Password Change Successful</h2>
        </div>
        <div style="padding: 20px;">
            <p>Hi {receiver},</p>
            <p>Your password has been successfully updated.</p>
        </div>
    """

    email_subject = "pennypal: Password Change Successful"

    mailing_data = {
        "from": sender,
        "to": receiver,
        "subject": email_subject,
        "html": email_style + body,
    }
    return requests.post(base_url, auth=api_key, data=mailing_data)


@shared_task
def send_withdrawal_mail(to, full_name, amount):
    body = f"""
        <div style="background-color: #26ADA4; color: #ffffff; text-align: center; padding: 20px;">
            <h2>Sakalist: Withdrawal Success</h2>
        </div>
        <div style="padding: 20px;">
            <p>Hi {full_name},</p>
            <p>An amount of {amount} has been successfully withdrawn from your wallet account on pennypal to your bank account.</p>
            <p>Thank you for choosing Sakaslist. You can log in to your account <a href="https://www.pennypal.com.ng/login">here</a>.</p>
        </div>
    """

    email_subject = "Sakalist: Withdrawal Success"

    mailing_data = {
        "from": sender,
        "to": to,
        "subject": email_subject,
        "html": email_style + body,
    }

    requests.post(base_url, auth=api_key, data=mailing_data)
