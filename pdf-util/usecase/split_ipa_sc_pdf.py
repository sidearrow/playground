import argparse
import csv
import os
from dataclasses import dataclass
from typing import List, Optional, Tuple

from pdf_util.split_pdf import split_pdf


@dataclass
class Record:
    id: str
    filename: str
    questions: List[Tuple[int, int]]


def load_tsv(id: str) -> Optional[Record]:
    with open("usecase/ipa_sc.tsv") as f:
        csvr = csv.reader(f, delimiter="\t")
        for i, row in enumerate(csvr):
            if i == 0:
                continue
            _id = row[0]
            if _id != id:
                continue
            questions = []
            for i in range(2, 5):
                if row[i] != "":
                    questions.append(
                        tuple([int(v)-1 for v in row[i].split(",")]))
            return Record(
                id=_id,
                filename=row[1],
                questions=questions
            )
    return None


def main(input_dir: str, output_dir: str, id: str):
    record = load_tsv(id)
    for i, q in enumerate(record.questions):
        output_filename = "{}_{}.pdf".format(record.id, i+1)
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
    parser.add_argument("--id", required=True)
    args = parser.parse_args()

    main(args.input_dir, args.output_dir, args.id)
