<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"
    xmlns="http://www.opengis.net/sld"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <!-- a named layer is the basic building block of an sld document -->

  <NamedLayer>
    <Name>Fault Traces - Neotectonic Sections - Net Slip Rates</Name>
    <UserStyle>
        <!-- they have names, titles and abstracts -->
      
      <Title>Fault Traces - Neotectonic Sections - Net Slip Rates</Title>
      <Abstract></Abstract>
      <!-- FeatureTypeStyles describe how to render different features -->
      <!-- a feature type for lines -->

      <FeatureTypeStyle>
        <!--FeatureTypeName>Feature</FeatureTypeName-->
 

        <Rule>
       <Name>0.0&lt;= net_slip_rate &lt; 0.22584577</Name>
       <Title>0.0&lt;= net_slip_rate &lt; 0.22584577</Title>
       <ogc:Filter>
         <ogc:And>           
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>0.0</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>0.22584577</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#2060FF</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>
<Rule>
       <Name>0.22584577&lt;= net_slip_rate &lt; 0.50269786</Name>
       <Title>0.22584577&lt;= net_slip_rate &lt; 0.50269786</Title>
       <ogc:Filter>
         <ogc:And>           
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>0.22584577</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>0.50269786</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#2060FF</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>
<Rule>
       <Name>0.50269786&lt;= net_slip_rate &lt; 0.84207582</Name>
       <Title>0.50269786&lt;= net_slip_rate &lt; 0.84207582</Title>
       <ogc:Filter>
         <ogc:And>           
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>0.50269786</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>0.84207582</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#209FFF</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>
<Rule>
       <Name>0.84207582&lt;= net_slip_rate &lt; 1.25810086</Name>
       <Title>0.84207582&lt;= net_slip_rate &lt; 1.25810086</Title>
       <ogc:Filter>
         <ogc:And>           
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>0.84207582</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>1.25810086</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#20BFFF</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>
<Rule>
       <Name>1.25810086&lt;= net_slip_rate &lt; 1.7680834</Name>
       <Title>1.25810086&lt;= net_slip_rate &lt; 1.7680834</Title>
       <ogc:Filter>
         <ogc:And>           
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>1.25810086</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>1.7680834</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#00CFFF</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>
<Rule>
       <Name>1.7680834&lt;= net_slip_rate &lt; 2.39324334</Name>
       <Title>1.7680834&lt;= net_slip_rate &lt; 2.39324334</Title>
       <ogc:Filter>
         <ogc:And>           
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>1.7680834</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>2.39324334</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#2AFFFF</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>
<Rule>
       <Name>2.39324334&lt;= net_slip_rate &lt; 3.15959301</Name>
       <Title>2.39324334&lt;= net_slip_rate &lt; 3.15959301</Title>
       <ogc:Filter>
         <ogc:And>           
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>2.39324334</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>3.15959301</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#55FFFF</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>
<Rule>
       <Name>3.15959301&lt;= net_slip_rate &lt; 4.09901951</Name>
       <Title>3.15959301&lt;= net_slip_rate &lt; 4.09901951</Title>
       <ogc:Filter>
         <ogc:And>           
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>3.15959301</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>4.09901951</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#7FFFFF</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>
<Rule>
       <Name>4.09901951&lt;= net_slip_rate &lt; 5.25061152</Name>
       <Title>4.09901951&lt;= net_slip_rate &lt; 5.25061152</Title>
       <ogc:Filter>
         <ogc:And>           
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>4.09901951</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>5.25061152</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#AAFFFF</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>
<Rule>
       <Name>5.25061152&lt;= net_slip_rate &lt; 6.66228572</Name>
       <Title>5.25061152&lt;= net_slip_rate &lt; 6.66228572</Title>
       <ogc:Filter>
         <ogc:And>           
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>5.25061152</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>6.66228572</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#FFFF54</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>
<Rule>
       <Name>6.66228572&lt;= net_slip_rate &lt; 8.39278057</Name>
       <Title>6.66228572&lt;= net_slip_rate &lt; 8.39278057</Title>
       <ogc:Filter>
         <ogc:And>           
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>6.66228572</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>8.39278057</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#FFF000</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>
<Rule>
       <Name>8.39278057&lt;= net_slip_rate &lt; 10.51410037</Name>
       <Title>8.39278057&lt;= net_slip_rate &lt; 10.51410037</Title>
       <ogc:Filter>
         <ogc:And>           
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>8.39278057</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>10.51410037</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#FFBF00</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>
<Rule>
       <Name>10.51410037&lt;= net_slip_rate &lt; 13.11451128</Name>
       <Title>10.51410037&lt;= net_slip_rate &lt; 13.11451128</Title>
       <ogc:Filter>
         <ogc:And>           
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>10.51410037</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>13.11451128</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#FFA800</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>
<Rule>
       <Name>13.11451128&lt;= net_slip_rate &lt; 16.30221401</Name>
       <Title>13.11451128&lt;= net_slip_rate &lt; 16.30221401</Title>
       <ogc:Filter>
         <ogc:And>           
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>13.11451128</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>16.30221401</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#FF8A00</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>
<Rule>
       <Name>16.30221401&lt;= net_slip_rate &lt; 20.20984593</Name>
       <Title>16.30221401&lt;= net_slip_rate &lt; 20.20984593</Title>
       <ogc:Filter>
         <ogc:And>           
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>16.30221401</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>20.20984593</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#FF7000</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>
<Rule>
       <Name>20.20984593&lt;= net_slip_rate &lt; 30.0</Name>
       <Title>20.20984593&lt;= net_slip_rate &lt; 30.0</Title>
       <ogc:Filter>
         <ogc:And>           
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>20.20984593</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               <ogc:Literal>30.0</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#FF4D00</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>

        
<Rule>
       <Name>net_slip_rate undefined</Name>
       <Title>net_slip_rate undefined</Title>
       <ogc:Filter>       
           <ogc:PropertyIsNull>
               <ogc:PropertyName>ns_net_slip_rate_comp</ogc:PropertyName>
               </ogc:PropertyIsNull>
       </ogc:Filter>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#000000</CssParameter>
            </Stroke>
          </LineSymbolizer>
     </Rule>
        
        </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>