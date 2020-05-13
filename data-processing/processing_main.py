import argparse
import yaml
import os
import pandas

from processing_config import ProcessingConfig


def main(processing_config: ProcessingConfig):
    input_file_path = os.path.join('./', processing_config.input_file_path)
    f = pandas.ExcelFile(input_file_path)

    df = f.parse(skiprows=processing_config.start_row_index, usecols=processing_config.use_col_indexes, header=None)

    output_data = []
    output_data.append(list(processing_config.col_mappings.values()))

    for i, row in df.iterrows():
        output_row = []
        for index in processing_config.col_mappings.keys():
            output_row.append(row[index])
        output_data.append(output_row)

    print(output_data)

    pass


argparser = argparse.ArgumentParser()
argparser.add_argument('--config-file', dest='config_file', required=True)

args = argparser.parse_args()

config_file_path = os.path.join('./processing_config', args.config_file)
with open(config_file_path, 'r') as f:
    config_dict = yaml.load(f)

processing_config = ProcessingConfig(config_dict)

main(processing_config)
