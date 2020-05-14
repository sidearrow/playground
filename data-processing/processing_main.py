import argparse
import yaml
import os
import openpyxl

from processing_config import ProcessingConfig


def main(config: ProcessingConfig):
    input_file_path = os.path.join('./', config.input_file_path)

    wb = openpyxl.load_workbook(input_file_path)
    sheet = wb.get_sheet_by_name(wb.sheetnames[0])

    output = []
    for i in range(config.start_row_index + 1, config.end_row_index + 1):

        is_skip = False
        for skip_empty_col_index in config.skip_empty_col_indexes:
            if sheet.cell(row=i, column=skip_empty_col_index + 1).value == None:
                is_skip = True
                break

        if is_skip:
            continue

        output_row = []
        for col_i, col_name in config.col_mappings.items():
            output_row.append(sheet.cell(row=i, column=col_i + 1).value)

        output.append(output_row)

    print(output)


argparser = argparse.ArgumentParser()
argparser.add_argument('--config-file', dest='config_file', required=True)

args = argparser.parse_args()

config_file_path = os.path.join('./processing_config', args.config_file)
with open(config_file_path, 'r') as f:
    config_dict = yaml.load(f)

processing_config = ProcessingConfig(config_dict)

main(processing_config)
