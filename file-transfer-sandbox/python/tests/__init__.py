from unittest import TestCase
from tests.config import Config


class BaseTest(TestCase):
    def setUp(self) -> None:
        self.config = Config()