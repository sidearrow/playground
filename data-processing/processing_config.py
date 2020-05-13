class ProcessingConfig:
    def __init__(self, config: dict):

        self.input_file_path = config['input_file_path']

        self.input_file_type = config['input_file_type']

        self.start_row_index = int(config['start_row_index'])

        self.end_col_index = int(config['end_col_index'])

        self.skip_empty_col_indexes = list(map(int, config['skip_empty_col_indexes']))

        self.col_mappings = dict(config['col_mappings'])

        self.use_col_indexes = self.getUseColIndexes()

    def getUseColIndexes(self):
        return list(set(self.skip_empty_col_indexes + list(self.col_mappings.keys())))
