from template import __version__
import unittest


class TemplateTest(unittest.TestCase):
    def test_version(self):
        self.assertEqual(__version__, '0.1.0')