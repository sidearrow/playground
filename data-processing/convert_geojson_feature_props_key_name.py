import argparse
import os
import json
import typing
import time
import copy


def iter_feature_props(geojson_dict: dict) -> typing.Iterator[typing.Tuple[dict, int]]:
    if 'features' not in geojson_dict:
        raise Exception("Not found field 'features'")
    for i, feature in enumerate(geojson_dict['features']):
        yield (feature['properties'], i)


def get_key_names(args):
    filepath = os.path.join(os.getcwd(), args.file)
    if not os.path.exists(filepath):
        raise Exception('File not exists. {}'.format(filepath))
    with open(filepath) as f:
        geojson_dict: dict = json.load(f)
    key_names = set()
    for props, _ in iter_feature_props(geojson_dict):
        for key in props.keys():
            if key not in key_names:
                key_names.add(key)
    print(key_names)


def convert_key_names(args):
    filepath = os.path.join(os.getcwd(), args.file)
    configpath = os.path.join(os.getcwd(), args.config)
    outputpath = os.path.join(os.getcwd(), args.output)
    for fpath in [filepath, configpath]:
        if not os.path.exists(fpath):
            raise Exception('File not exists. {}'.format(fpath))
    with open(filepath) as f:
        geojson_dict = json.load(f)
    with open(configpath) as f:
        config: dict = json.load(f)
    for props, i in iter_feature_props(geojson_dict):
        new_props = copy.copy(props)
        for key in props.keys():
            if key in config.keys():
                val = new_props.pop(key)
                if config[key] is not None:
                    new_props[config[key]] = val
            geojson_dict['features'][i]['properties'] = new_props
    with open(outputpath, 'wt') as f:
        json.dump(geojson_dict, f, ensure_ascii=False)


def main():
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers()

    parser_get_key_names = subparsers.add_parser('get-key-names')
    parser_get_key_names.add_argument('-f', '--file', required=True)
    parser_get_key_names.set_defaults(handler=get_key_names)

    parser_convert_key_names = subparsers.add_parser('convert-key-names')
    parser_convert_key_names.add_argument('-f', '--file', required=True)
    parser_convert_key_names.add_argument('-c', '--config', required=True)
    parser_convert_key_names.add_argument('-o', '--output', required=True)
    parser_convert_key_names.set_defaults(handler=convert_key_names)

    args = parser.parse_args()
    if hasattr(args, 'handler'):
        args.handler(args)


if __name__ == '__main__':
    #start = time.time()
    main()
    #elapsed_time = time.time() - start
    #print("elapsed_time:{0}".format(elapsed_time) + "[sec]")
