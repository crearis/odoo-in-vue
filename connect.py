# Start IPython with this file executed, by running the following in your CLI: ipython -i connect.py

from odoo_rpc_client import Client
odoo = Client(host='127.0.0.1', dbname='demo', user='admin', pwd='admin', protocol='json-rpc')
