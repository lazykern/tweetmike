import getopt

import json
import sys

import requests
from bs4 import BeautifulSoup


def get_param_index(param_name, params):
    for i, param in enumerate(params):
        if param_name == param['name']:
            return i


def scrap_body(url):

    

    page = requests.get(url)

    soup = BeautifulSoup(page.content.decode('utf-8'), "html.parser")

    for h in soup.findAll('h3'):
        if h.text == "JSON body parameters":
            table = h.findNextSibling('table')

    params = []

    for b in table.find_all('tr')[1:]:
        param = {}
        rows = b.find_all('td')

        p_name = rows[0].find('code').text.strip()
        p_description = rows[2].text.split('Example')[0].strip()
        p_required = rows[0].find('small', {'class': 'required'}) is not None
        p_type = rows[1].text.strip()

        if 'enum' in p_type:
            #enum (invited_user_ids, speaker_ids, creator_id, host_ids, topics_ids)
            allowed_values = p_type.split('(')[1].split(')')[0].split(',')
            allowed_values = [v.strip() for v in allowed_values]
            p_type = 'enum'

        param['name'] = p_name
        param['role'] = 'body'
        param['description'] = p_description
        param['type'] = p_type
        param['required'] = p_required

        if '.' in p_name:
            param_base, param['name'] = p_name.split('.')

            idx = get_param_index(param_base, params)
            params[idx].setdefault("params", [])
            params[idx]["params"].append(param)
        else:
            params.append(param)
        
    return param

if __name__ == '__main__':
    url = sys.argv[1]

    try:
        output_file = sys.argv[2]
    except:
        output_file = url.split('/')[-1] + '.json'
    
    json_body = scrap_body(url)
    with open(output_file, 'w') as f:
        json.dump(json_body, f, indent=4)
    sys.exit(0)