import os

INPUT_DIR = 'processing_input'
OUTPUT_DIR = 'processing_output'


class ProcessingConfig:
    def __init__(self, config: dict):

        self.input_file_path = os.path.join(
            './', INPUT_DIR, config['input_file_name'])

        self.input_file_type = config['input_file_type']

        self.output_file_path = os.path.join(
            './', OUTPUT_DIR, config['output_file_name'])

        self.start_row_index = int(config['start_row_index'])

        self.end_row_index = int(config['end_row_index'])

        self.skip_empty_col_indexes = list(
            map(int, config['skip_empty_col_indexes']))

        self.col_mappings = dict(config['col_mappings'])
