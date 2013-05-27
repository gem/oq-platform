def exec_query(cursor, query, *args):
    """
    Helper function for executing DB queries.

    Makes testing and mocking easier.
    """
    cursor.execute(query, args)
    return cursor.fetchall()
