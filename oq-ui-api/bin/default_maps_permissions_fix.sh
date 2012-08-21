#!/bin/bash
#
# Description: 
#
# GEM: our policies deny anonymous access, also for read-only
#

cat <<EOF | patch -p0
--- null	2012-06-15 13:24:04.126142027 +0200
+++ /var/lib/geonode/src/GeoNodePy/geonode/maps/models.py	2012-06-15 12:02:48.696140249 +0200
@@ -1157,7 +1157,9 @@
     LEVEL_ADMIN = 'layer_admin'
                  
     def set_default_permissions(self):
-        self.set_gen_level(ANONYMOUS_USERS, self.LEVEL_READ)
+        # GEM: our policies deny anonymous access, also for read only
+        # self.set_gen_level(ANONYMOUS_USERS, self.LEVEL_READ)
+        self.set_gen_level(ANONYMOUS_USERS, self.LEVEL_NONE)
         self.set_gen_level(AUTHENTICATED_USERS, self.LEVEL_READ) 
 
         # remove specific user permissions
EOF

