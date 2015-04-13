Only a few modifications are needed to create a development environment on a Mac.

1. Using github clone the OpenQuake Platform (OQP) repository: with 
`git clone https://github.com/gem/oq-platform.git`

2. Change directory to the downloaded repository directory: 
`cd oq-platform`

3. Create virtual environment:
`virtualenv <PATH TO YOUR DEV ENV>/.virtualenvs/platform` 
where 'platform' will be the name of the virtual environment.

4. Activate the virtual environment:
`source <PATH TO YOUR DEV ENV>/.virtualenvs/platform/bin/activate`

5. Initialize submodules:
`git submodule init`
`git submodule update` 

6. (Optional) install the requirement for the vulnerability application, see vulnerability readme

7. Modify fabfile.py by changing the POSTGIS_DIR to (may very depending on your specific postgis installation):
`/Applications/Postgres.app/Contents/MacOS/share/contrib/postgis-2.0 `

8. In the fabfile.py modify all instances of `postgres` to your systems postgres user

9. In the pavement.py change `pip install -e .` to `ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future pip install -e .`

10. (Optional, some environment may have conflicts with lxml and or numpy) in the setup.py file comments out lxml and or numpy.

11. `fab bootstrap`