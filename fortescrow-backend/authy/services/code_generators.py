from uuid import uuid4


class CodeGenerator:
    @staticmethod
    def generate_otp(length: int):
        return str(uuid4().int)[:length]