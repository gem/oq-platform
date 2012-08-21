#!/bin/bash
#
# Description: 
#
# for some reason self.stdout is not set in this class and running
# 'python ./manage.py collectstatic' produce an error.
# This patch remove wrongly not mandatory stdout log from the code.
#

cat <<EOF | patch -p0
--- null	2012-06-12 09:55:53.000000000 +0200
+++ /var/lib/geonode/lib/python2.7/site-packages/django/contrib/staticfiles/management/commands/collectstatic.py 2012-06-11 17:45:39.734231912 +0200
@@ -180,7 +180,7 @@
                                    ', %s post-processed'
                                    % post_processed_count or ''),
             }
-            self.stdout.write(smart_str(summary))
+            # self.stdout.write(smart_str(summary))
 
     def log(self, msg, level=2):
         """
@@ -189,8 +189,8 @@
         msg = smart_str(msg)
         if not msg.endswith("\n"):
             msg += "\n"
-        if self.verbosity >= level:
-            self.stdout.write(msg)
+        # if self.verbosity >= level:
+        #    self.stdout.write(msg)
 
     def clear_dir(self, path):
         """
EOF

