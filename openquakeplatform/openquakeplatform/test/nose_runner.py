import nose

from failurecatcher import FailureCatcher

if __name__ == '__main__':
    nose.main(addplugins=[FailureCatcher()])
