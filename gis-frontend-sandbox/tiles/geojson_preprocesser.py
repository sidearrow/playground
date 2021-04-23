import argparse
import json


def extract_dict(data: dict, config: dict) -> dict:
    res = {}
    for k, v in config.items():
        null_values = v.get('null_values', [])

        if data[k] == None:
            res[v['name']] = data[k]
            continue
        if len(null_values) > 0 and data[k] in null_values:
            res[v['name']] = None
            continue
        if v['type'] == 'string':
            res[v['name']] = str(data[k])
            continue
        if v['type'] == 'int':
            res[v['name']] = int(data[k])
    return res


def parse_arg():
    parser = argparse.ArgumentParser()
    parser.add_argument('--geojson', required=True)
    parser.add_argument('--config', required=True)

    return parser.parse_args()


class GeoJsonConfig:
    def __init__(self, filepath: str):
        data = self.__load(filepath)
        self.properties: dict = data['properties']

    def __load(self, filepath: str) -> dict:
        with open(filepath) as f:
            return json.load(f)


class GeoJson:
    def __init__(self, filepath: str):
        self.__data = self.__load(filepath)

    def __load(self, filepath: str) -> dict:
        with open(filepath) as f:
            return json.load(f)

    def itr_feature_properties(self):
        for i, feature in enumerate(self.__data['features']):
            yield i, feature['properties']

    def update_feature_properties(self, i: int, data: dict):
        self.__data['features'][i]['properties'] = data

    def export(self, filepath: str):
        with open(filepath, 'w') as f:
            json.dump(self.__data, f, indent=4, ensure_ascii=False)


if __name__ == '__main__':
    args = parse_arg()
    geojson = GeoJson(args.geojson)
    geojson_config = GeoJsonConfig(args.config)

    for i, props in geojson.itr_feature_properties():
        update_data = extract_dict(props, geojson_config.properties)
        geojson.update_feature_properties(i, update_data)

    geojson.export('aaa')
