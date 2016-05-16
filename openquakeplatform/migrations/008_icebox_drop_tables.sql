DO
$do$
DECLARE
   _tbl text;
BEGIN
FOR _tbl  IN
    SELECT quote_ident(table_schema) || '.'
        || quote_ident(table_name)
    FROM   information_schema.tables
    WHERE  table_name LIKE 'icebox%'
    AND    table_schema NOT LIKE 'pg_%'
LOOP
   EXECUTE
   'DROP TABLE ' || _tbl || ' CASCADE';
END LOOP;
END
$do$;
