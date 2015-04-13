### Disable unused features
1. WCS
2. Set WFS as "basic"

## With OpenJDK

### Enable JAI
1. Install ```libjai-imageio-core-java``` and ```libjai-core-java```
2. Enable JAI in config

### Tomcat native library
1. Install ```libtcnative-1```

## With Oracle Java
### Install Java
1. ```mkdir /opt/java```
2. Download and extract jre in ```/opt/java```
3. Add to ```/etc/profile```
```
JAVA_HOME=/opt/java/jre1.7.0_60
PATH=$PATH:$JAVA_HOME/bin
export JAVA_HOME
export PATH
```
4. ```update-alternatives --install "/usr/bin/java" "java" "/opt/java/jdk1.7.0_60/bin/java" 1```
5. ```update-alternatives --set java /opt/java/jdk1.7.0_60/bin/java```

### Install JAI
1. ```/opt/java/jdk1.7.0_60/jre/```
2. ```wget http://download.java.net/media/jai/builds/release/1_1_3/jai-1_1_3-lib-linux-amd64-jre.bin```
3. ```bash jai-1_1_3-lib-linux-amd64-jre.bin```

## References:
* http://docs.geonode.org/en/master/tutorials/admin/production.html
* http://boundlessgeo.com/whitepaper/geoserver-production-2/
* http://docs.geoserver.org/stable/en/user/production/java.html