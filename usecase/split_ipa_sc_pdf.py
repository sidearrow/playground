import argparse
import csv
import os
from dataclasses import dataclass
from typing import List, Tuple

from pdf_util.split_pdf import split_pdf


@dataclass
class Record:
    season: int
    exam_type: str
    filename: str
    questions: List[Tuple[int, int]]


def load_tsv() -> List[Record]:
    res = []
    with open("usecase/ipa_sc.tsv") as f:
        csvr = csv.reader(f, delimiter="\t")
        for i, row in enumerate(csvr):
            if i == 0:
                continue
            questions = []
            for i in range(3, 6):
                if row[i] != "":
                    questions.append(
                        tuple([int(v)-1 for v in row[i].split(",")]))
            res.append(Record(
                season=row[0],
                exam_type=row[1],
                filename=row[2],
                questions=questions
            ))
    return res


def main(input_dir: str, output_dir: str):
    records = load_tsv()
    for record in records:
        for i, q in enumerate(record.questions):
            output_filename = "{}_{}_{}.pdf".format(
                record.season, record.exam_type, i+1)
            split_pdf(
                input_filepath=os.path.join(input_dir, record.filename),
                output_filepath=os.path.join(output_dir, output_filename),
                start=q[0],
                end=q[1],
            )


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-dir", required=True)
    parser.add_argument("--output-dir", required=True)
    args = parser.parse_args()

    main(args.input_dir, args.output_dir)
