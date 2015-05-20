#!/usr/bin/env python
import csv

def cmp_items(a,b):
     if a[2] > b[2]:
          return 1
     elif a[2] == b[2]:
          return 0
     else:
          return -1

#
#  MAIN
#
def main():
     f = file("out.csv")
     cs = csv.reader(f, delimiter='|')
     old = ""

     out = []

     for row in cs:
          out.append(row)

     out.sort(cmp_items)

     fo = open('out_sorted.csv', 'wb')
     csv_wri = csv.writer(fo, delimiter='|')

     for i in out:
          if i[3] != old:
               csv_wri.writerow(i)
               old = i[3]
               if i[4] == "WARNING":
                    print "------"
                    print "%s" % i[3]
                    print "%s" % i[6]

     fo.close()

main()
