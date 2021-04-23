import csv


class CsvReader:

    @staticmethod
    def get(file_path):
        with open(file_path, encoding='utf-8') as f:
            r = csv.DictReader(f)

            return [row for row in r]
