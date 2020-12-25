import argparse
import os

from PyPDF2 import PdfFileReader, PdfFileWriter


def main(start: int, end: int, input_filepath: str, output_filepath: str):
    r = PdfFileReader(open(input_filepath, "rb"), strict=False)
    w = PdfFileWriter()
    if r.isEncrypted:
        r.decrypt("")
    for i in range(start, end + 1):
        w.addPage(r.getPage(i))
    with open(output_filepath, "wb") as f:
        w.write(f)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--start", required=True)
    parser.add_argument("--end", required=True)
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)

    args = parser.parse_args()

    start = int(args.start)
    end = int(args.end)
    input_filepath = os.path.join(os.getcwd(), args.input)
    output_filepath = os.path.join(os.getcwd(), args.output)

    main(start, end, input_filepath, output_filepath)
