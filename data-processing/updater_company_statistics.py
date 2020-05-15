import argparse
import os
from database import get_connection


class Config:
    def __init__(self, args):
        self.is_dry_run = bool(args.dry_run)
        self.input_file_path = os.path.join('./', args.input_file)


def main(config: Config):
    print(vars(config))


argparser = argparse.ArgumentParser()
argparser.add_argument('--dry-run', dest='dry_run', action='store_false')
argparser.add_argument('--input-file', dest='input_file', required=True)

args = argparser.parse_args()

config = Config(args)

main(config)
