from openquake.moon import Moon
import atexit

pla = Moon()
pla.primary_set()

def setup_package():
    pla.init(jqheavy=True)

# turned off because nose run it at the wrong time
#def teardown_package():
#    print "teardown_package here"
#    pla.fini()

def my_at_exit():
    pla.fini()

atexit.register(my_at_exit)
