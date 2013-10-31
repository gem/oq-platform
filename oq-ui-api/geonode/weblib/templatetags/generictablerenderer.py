__author__ = 'Simon Ruffle'

from django.template import Library, Node
import datetime

register = Library()

def iteratetable(queryset,columnnameslist):
    record_list = [] #output is a list of dictionaries (associative arrays) with record number and field values
    ident = 0
    for record in queryset:
        column_list = []
        for columnname in columnnameslist:
            columnvalue = getattr(record,columnname)

            token = columnvalue

            if columnname == 'image1':
                token = columnvalue.get_url(getattr(record,'image1size').get_name())


            column_list.append(token)

        tuple = dict()
        if hasattr(record, 'id'):
            indent = record.id

        tuple[str(ident)] = column_list;
        record_list.append(tuple)

        ident = ident + 1

    return {'output': record_list, 'columnnameslist': columnnameslist}

@register.inclusion_tag ('simplelist.html', takes_context=True)
def simplelist(context,setup):
    #unpack the setup variable that is defined in handler for the page that contains this tag
    queryset = setup['queryset']
    columnnameslist = setup['fields']
    return iteratetable(queryset,columnnameslist)

@register.inclusion_tag ('simpletable.html', takes_context=True)
def simpletable(context,setup):

    # context give access to all variables in the template, so we can see the ix variable
    #ix = context['ix']

    #unpack the setup variable that is defined in handler for the page that contains this tag
    queryset = setup['queryset']
    columnnameslist = setup['fields']

    return iteratetable(queryset,columnnameslist)

@register.inclusion_tag ('simpleview.html', takes_context=True)
def simpleview(context,setup):
    #unpack the setup variable that is defined in hander for the page that contains this tag
    queryset = setup['queryset']
    columnnameslist = setup['fields']

    record_list = []
    record = queryset
    column_list = []
    for columnname in columnnameslist:
        token = getattr(record,columnname)
        if columnname == 'image1':
            token = token.get_url(getattr(record,'image1size').get_name())
        column_list.append(token)
    tuple = dict()
    tuple[str(record.id)] = column_list;
    record_list.append(tuple)

    return {'output': record_list, 'columnnameslist': columnnameslist}



def iteratefieldstructure(field_structure, context):

    pageclass = context['pageclass']
    if field_structure == '':
        raise Exception ('field_structure is empty in generic table renderer')
    queryset = field_structure['entity']

    columnheadingslist = []                     # gets sent to the template
    render_structure = []                       # gets sent to the template
    target_url = field_structure['targeturl']   # gets sent to the template

    linkprefix = ''  # used to prefix links derived from foreign keys, so you can look up in the related table
    linksuffix = ''
    tagclass = 'tag'
    if 'params' in field_structure:

        if 'foreignkeylinkprefix' in field_structure['params']:
            linkprefix = field_structure['params']['foreignkeylinkprefix']

        if 'linksuffix' in field_structure['params']:
            linksuffix = field_structure['params']['linksuffix']

        if 'tagclass' in field_structure['params']:
            tagclass = field_structure['params']['tagclass']

    for field in field_structure['fields']:
        columnname = str(field[0].keys()[0])
        columnheadingslist.append(str(field[0][columnname]['title']))

    ident = 0  # we use this in case there is no id attribute in the queryset

    for record in queryset:

        # we must store the fields in a list so we keep the right ordering
        render_record = []

        for field in field_structure['fields']:

            # dictionary for basic html setup
            html_definition = dict()

            # the html tag attributes
            tag_attributes = dict()
            tag_attributes['class'] = 'fieldvalue'

            columnname = str(field[0].keys()[0])
            columnvalue = getattr(record,columnname)

            fieldtype = str(field[0][columnname]['type'])
            tag_attributes['class'] = 'fieldvalue ' + fieldtype + ' ' + columnname
            tag = 'span'
            if fieldtype == 'WebLibPhoto' and columnvalue is not None:
                photosize = "admin_thumbnail"
                if 'photosize' in field[0][columnname]:
                    photosize = str(field[0][columnname]['photosize'])
                if 'photosizecolumn' in field[0][columnname]:
                    photosize = getattr(record,field[0][columnname]['photosizecolumn']).get_name()
                tag ='img'
                tag_attributes['src'] = columnvalue.get_url(photosize)
                columnvalue = ''
                tag_attributes['class'] = photosize + ' ' + columnname

            # link to track back through foreign key - try clause is there in case no _meta record
            try:
                if fieldtype != 'WebLibPhoto' and columnvalue is not None and record._meta.get_field(columnname).get_internal_type() == 'ForeignKey':
                    columnvalue = '<a href=' + linkprefix + '/' + str(columnvalue._meta.module_name) + '/' + str(columnvalue.id) + '>' + str(columnvalue) + '</a>'
            except:
                pass

            if columnvalue is None:
                columnvalue = ''

            html_definition['columnname'] = columnname

            if fieldtype in ['DateTimeField']:
                # not very robust way of detecting when a datetime was used to store just a date, or just a time
                try:
                    if columnvalue.time().hour == 0 and columnvalue.time().minute == 0 and columnvalue.time().second == 0 and columnvalue.time().microsecond == 0:
                        columnvalue = columnvalue.date()
                    if columnvalue.year == 2000 and columnvalue.month == 1 and columnvalue.day == 1:
                        columnvalue = columnvalue.time()
                    columnvalue = unicode(columnvalue)
                except:
                    pass

            if fieldtype in ['DecimalField']:
                if columnvalue is not '':
                    if 'decimal_places' in field[0][columnname]:
                        d = int(field[0][columnname]['decimal_places'])
                        columnvalue = unicode(round(columnvalue,d))

            if fieldtype in ['TextField','CharField']:
                html_definition['value'] = columnvalue.replace('\n', '<br />')
            else:
                html_definition['value'] = columnvalue

            html_definition['tag'] = tag
            html_definition['nested'] = []
            html_definition['attributes'] = tag_attributes

            render_record.append(html_definition)

        # create a tuple with the record id and the render_record
        tuple = dict()

        if hasattr(record,'id'):
            ident = record.id
        tuple[str(ident)] = render_record;
        render_structure.append(tuple)

        ident = ident + 1



#    for record in queryset:
#        column_list = []
#        for columnname in columnnameslist:
#            columnvalue = getattr(record,columnname)
#
#            token = columnvalue
#
#            if columnname == 'image1':
#                token = columnvalue.get_url(getattr(record,'image1size').get_name())
#
#
#            column_list.append(token)
#
#        tuple = dict()
#        tuple[str(record.id)] = column_list;
#        record_list.append(tuple)

    return {'render_structure': render_structure, 'columnheadings_list': columnheadingslist, 'target_url': target_url, 'pageclass': pageclass, 'media_url': context['MEDIA_URL'], 'linksuffix': linksuffix, 'tagclass': tagclass}


@register.inclusion_tag ('tableview.html', takes_context=True)
def tableview( context, field_structure ):

    return iteratefieldstructure( field_structure, context)

@register.inclusion_tag ('gridview.html', takes_context=True)
def gridview( context, field_structure ):

    return iteratefieldstructure( field_structure, context)

@register.inclusion_tag ('formview.html', takes_context=True)
def formview( context, field_structure ):

    return iteratefieldstructure( field_structure, context)

@register.inclusion_tag ('formviewwithlabels.html', takes_context=True)
def formviewwithlabels( context, field_structure ):

    return iteratefieldstructure( field_structure, context)

@register.inclusion_tag ('formviewastable.html', takes_context=True)
def formviewastable( context, field_structure ):

    return iteratefieldstructure( field_structure, context)

@register.inclusion_tag ('gridlist.html', takes_context=True)
def gridlist( context, field_structure ):

    return iteratefieldstructure( field_structure, context)

@register.inclusion_tag ('weblinklist.html', takes_context=True)
def weblinklist( context, field_structure ):

    return iteratefieldstructure( field_structure, context)

@register.inclusion_tag ('documentlist.html', takes_context=True)
def documentlist( context, field_structure ):

    return iteratefieldstructure( field_structure, context)

@register.inclusion_tag ('spanlist.html', takes_context=True)
def spanlist( context, field_structure ):

    return iteratefieldstructure( field_structure, context)