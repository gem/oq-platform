#!/bin/bash
#
# Description: 
#
# GEM: our policies deny anonymous access, also for read-only
#

cat <<EOF | patch -p0
--- null	2012-11-26 14:21:36.246217764 +0100
+++ /var/lib/geonode/src/GeoNodePy/geonode/maps/models.py	2012-11-26 14:29:50.358240127 +0100
@@ -1188,8 +1188,11 @@
     LEVEL_ADMIN = 'layer_admin'
                  
     def set_default_permissions(self):
-        self.set_gen_level(ANONYMOUS_USERS, self.LEVEL_READ)
-        self.set_gen_level(AUTHENTICATED_USERS, self.LEVEL_READ) 
+        # GEM: our policies deny anonymous access, also for read only
+        # self.set_gen_level(ANONYMOUS_USERS, self.LEVEL_READ)
+        # self.set_gen_level(AUTHENTICATED_USERS, self.LEVEL_READ)
+        self.set_gen_level(ANONYMOUS_USERS, self.LEVEL_NONE)
+        self.set_gen_level(AUTHENTICATED_USERS, self.LEVEL_WRITE)
 
         # remove specific user permissions
         current_perms =  self.get_all_level_info()
EOF

