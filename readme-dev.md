## Development Setup

Assumptions:
 - You are a Python developer
 - You have at least basic Odoo development knowledge

Pre-requisites:

Assuming you are using Ubuntu 18.04 for development (or similar)

 - Python `setuptools` - (`sudo apt-get install python3-setuptools`)
 - Python `wheel` - (`pip3 install wheel`)
 

 1. Get Odoo 13 one of 2 ways (choose just one, unless you know what you are doing):
    - Clone the Odoo **13** source code to a directory of your choice. You can use the following script to do this.
    Be sure to read the [source code](https://gitlab.com/sylnsr/linux-stuff/-/raw/master/dev/scripts/odoo/thin-clone-odoo.sh)
    if you have security concerns. Just run the this command in a directory where you want to download the source code
    (be sure to choose Odoo **13** when prompted):    
    `source <(curl -s https://gitlab.com/sylnsr/linux-stuff/-/raw/master/dev/scripts/odoo/thin-clone-odoo.sh)`
    - Install Odoo 13 using the .deb installer file - just run `install-odoo-debian.sh`
 
 2. Setup your Python 3.6 virtual environment by running the following in the root directory of the project:  
    `python3 -m venv ./venv`
 
 3. Activate the Python 3 virtual environment:  
    `source ./venv/bin/activate`
 
 4. Install the Odoo requirements into the virtual environment:
    `pip3 install -r <path-where-you-cloned-odoo-13>/requirements.txt`
    
 5. Copy `debug-odoo.conf.dist` to `debug-odoo.conf` and update it so that `data_dir` and `addons_path`
    are correct paths for your file system.
  
 6. Run `./docker/start-postgres.sh` and `./docker/start-traefik.sh`. Then start debugging Odoo in your IDE.
    
 7. Finally, from the `./ui/` folder, run `quasar dev` to start Quasar in development mode. Now going to,
    http://localhost/vue gets you into the custom UI app and http://localhost/web will get you into Odoo 13.
    Direct access to Odoo 13 via http://localhost:8069 will also work for that.
    
**Note:** if you install Odoo from the installer AND THEN you try to run it from source, you will probably get an error
indicating that port 8069 is already in use. This is because the installer starts Odoo running as a service so the
port will already be occupied.

---

### Debugging with a JetBrains IDE

After setting up your environment, you should be able to just run the `odoo-bin` run/debug configuration that is already
[provided with this project](./.idea/runConfigurations/odoo_bin.xml), AFTER you correct the "Script path" and "Parameters"
"Working directory" and "Python Interpreter" so that they are correct for your environment. Note, the Python Interpreter
MUST point to the Python binary in the project's Python virtual environment.

If you get the following error when debugging: `greenlet.error: cannot switch to a different thread` and the long-polling
port is not working, then look at this: https://github.com/miguelgrinberg/Flask-SocketIO/issues/65#issuecomment-294375994  
Its a simple fix.


---

**Recommended Tools**

- IDE: [IntelliJ IDEA](https://www.jetbrains.com/idea/) or [Pycharm](https://www.jetbrains.com/pycharm/)
- Python Shell: [IPython](https://ipython.readthedocs.io/en/stable/install/index.html)

The [IPython](https://ipython.org/) shell is especially useful with [odoo-rpc-client](https://github.com/katyukha/odoo-rpc-client)
for testing your class methods that are accessible over Odoo's built-in JSON-RPC API.

The `requirements.txt` file already includes `odoo-rpc-client`. So assuming you:
 1. are using the default login with the demo database
 2. have the virtual environment (venv) activated
 
... just type the following in your CLI:

    ipython -i connect.py
    
Now you can start using the Odoo JSON-RPC API, for example:

    odoo['res.partner'].browse(1).email

... which results in:
    
    Out[6]: 'info@yourcompany.example.com'