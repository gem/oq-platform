<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"
    xmlns="http://www.opengis.net/sld"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>isc_viewer_measure</Name>
    <UserStyle>
      <Title>GeoServer SLD Cook Book: Attribute-based point</Title>
      <FeatureTypeStyle>
     <Rule>
       <Name>unknown mag AND depth &lt;= 15 km</Name>
       <Title>unknown mag AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND depth &lt;= 15 km</Name>
       <Title> mw &lt;= 4 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND depth &lt;= 15 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND depth &lt;= 15 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND depth &lt;= 15 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>17</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND depth &lt;= 15 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND depth &lt;= 15 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND depth &lt;= 15 km</Name>
       <Title> 9 &lt; mw AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>


           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 15km &lt; depth &lt;= 35 km</Name>
       <Title>unknown mag AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>15</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> mw &lt;= 4 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>17</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 9 &lt; mw AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 35km &lt; depth &lt;= 70 km</Name>
       <Title>unknown mag AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>35</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> mw &lt;= 4 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>17</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 9 &lt; mw AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 70km &lt; depth &lt;= 150 km</Name>
       <Title>unknown mag AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>70</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> mw &lt;= 4 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>17</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 9 &lt; mw AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 150km &lt; depth &lt;= 300 km</Name>
       <Title>unknown mag AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>150</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> mw &lt;= 4 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>17</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 9 &lt; mw AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 300km &lt; depth </Name>
       <Title>unknown mag AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>300</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 300km &lt; depth </Name>
       <Title> mw &lt;= 4 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 300km &lt; depth </Name>
       <Title> 4 &lt; mw &lt;= 5 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 300km &lt; depth </Name>
       <Title> 5 &lt; mw &lt;= 6 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 300km &lt; depth </Name>
       <Title> 6 &lt; mw &lt;= 7 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>17</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 300km &lt; depth </Name>
       <Title> 7 &lt; mw &lt;= 8 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 300km &lt; depth </Name>
       <Title> 8 &lt; mw &lt;= 9 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 300km &lt; depth </Name>
       <Title> 9 &lt; mw AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND unknown depth</Name>
       <Title> mw &lt;= 4 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>

             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND unknown depth</Name>
       <Title> 4 &lt; mw &lt;= 5 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND unknown depth</Name>
       <Title> 5 &lt; mw &lt;= 6 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND unknown depth</Name>
       <Title> 6 &lt; mw &lt;= 7 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>17</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND unknown depth</Name>
       <Title> 7 &lt; mw &lt;= 8 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND unknown depth</Name>
       <Title> 8 &lt; mw &lt;= 9 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND unknown depth</Name>
       <Title> 9 &lt; mw AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND depth &lt;= 15 km</Name>
       <Title>unknown mag AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND depth &lt;= 15 km</Name>
       <Title> mw &lt;= 4 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND depth &lt;= 15 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND depth &lt;= 15 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND depth &lt;= 15 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND depth &lt;= 15 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND depth &lt;= 15 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND depth &lt;= 15 km</Name>
       <Title> 9 &lt; mw AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>


           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 15km &lt; depth &lt;= 35 km</Name>
       <Title>unknown mag AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>15</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> mw &lt;= 4 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 9 &lt; mw AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 35km &lt; depth &lt;= 70 km</Name>
       <Title>unknown mag AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>35</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> mw &lt;= 4 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 9 &lt; mw AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 70km &lt; depth &lt;= 150 km</Name>
       <Title>unknown mag AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>70</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> mw &lt;= 4 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 9 &lt; mw AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 150km &lt; depth &lt;= 300 km</Name>
       <Title>unknown mag AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>150</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> mw &lt;= 4 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 9 &lt; mw AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 300km &lt; depth </Name>
       <Title>unknown mag AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>300</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 300km &lt; depth </Name>
       <Title> mw &lt;= 4 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 300km &lt; depth </Name>
       <Title> 4 &lt; mw &lt;= 5 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 300km &lt; depth </Name>
       <Title> 5 &lt; mw &lt;= 6 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 300km &lt; depth </Name>
       <Title> 6 &lt; mw &lt;= 7 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 300km &lt; depth </Name>
       <Title> 7 &lt; mw &lt;= 8 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 300km &lt; depth </Name>
       <Title> 8 &lt; mw &lt;= 9 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 300km &lt; depth </Name>
       <Title> 9 &lt; mw AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND unknown depth</Name>
       <Title> mw &lt;= 4 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>

             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND unknown depth</Name>
       <Title> 4 &lt; mw &lt;= 5 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND unknown depth</Name>
       <Title> 5 &lt; mw &lt;= 6 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND unknown depth</Name>
       <Title> 6 &lt; mw &lt;= 7 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND unknown depth</Name>
       <Title> 7 &lt; mw &lt;= 8 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND unknown depth</Name>
       <Title> 8 &lt; mw &lt;= 9 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND unknown depth</Name>
       <Title> 9 &lt; mw AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND depth &lt;= 15 km</Name>
       <Title>unknown mag AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND depth &lt;= 15 km</Name>
       <Title> mw &lt;= 4 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND depth &lt;= 15 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND depth &lt;= 15 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND depth &lt;= 15 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND depth &lt;= 15 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND depth &lt;= 15 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND depth &lt;= 15 km</Name>
       <Title> 9 &lt; mw AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>


           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 15km &lt; depth &lt;= 35 km</Name>
       <Title>unknown mag AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>15</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> mw &lt;= 4 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 9 &lt; mw AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 35km &lt; depth &lt;= 70 km</Name>
       <Title>unknown mag AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>35</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> mw &lt;= 4 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 9 &lt; mw AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 70km &lt; depth &lt;= 150 km</Name>
       <Title>unknown mag AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>70</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> mw &lt;= 4 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 9 &lt; mw AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 150km &lt; depth &lt;= 300 km</Name>
       <Title>unknown mag AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>150</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> mw &lt;= 4 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 9 &lt; mw AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 300km &lt; depth </Name>
       <Title>unknown mag AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>300</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 300km &lt; depth </Name>
       <Title> mw &lt;= 4 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 300km &lt; depth </Name>
       <Title> 4 &lt; mw &lt;= 5 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 300km &lt; depth </Name>
       <Title> 5 &lt; mw &lt;= 6 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 300km &lt; depth </Name>
       <Title> 6 &lt; mw &lt;= 7 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 300km &lt; depth </Name>
       <Title> 7 &lt; mw &lt;= 8 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 300km &lt; depth </Name>
       <Title> 8 &lt; mw &lt;= 9 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 300km &lt; depth </Name>
       <Title> 9 &lt; mw AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND unknown depth</Name>
       <Title> mw &lt;= 4 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>

             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND unknown depth</Name>
       <Title> 4 &lt; mw &lt;= 5 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND unknown depth</Name>
       <Title> 5 &lt; mw &lt;= 6 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND unknown depth</Name>
       <Title> 6 &lt; mw &lt;= 7 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND unknown depth</Name>
       <Title> 7 &lt; mw &lt;= 8 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND unknown depth</Name>
       <Title> 8 &lt; mw &lt;= 9 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND unknown depth</Name>
       <Title> 9 &lt; mw AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>0</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND depth &lt;= 15 km</Name>
       <Title>unknown mag AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND depth &lt;= 15 km</Name>
       <Title> mw &lt;= 4 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND depth &lt;= 15 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND depth &lt;= 15 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND depth &lt;= 15 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>17</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND depth &lt;= 15 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND depth &lt;= 15 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND depth &lt;= 15 km</Name>
       <Title> 9 &lt; mw AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>


           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 15km &lt; depth &lt;= 35 km</Name>
       <Title>unknown mag AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>15</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> mw &lt;= 4 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>17</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 9 &lt; mw AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 35km &lt; depth &lt;= 70 km</Name>
       <Title>unknown mag AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>35</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> mw &lt;= 4 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>17</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 9 &lt; mw AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 70km &lt; depth &lt;= 150 km</Name>
       <Title>unknown mag AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>70</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> mw &lt;= 4 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>17</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 9 &lt; mw AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 150km &lt; depth &lt;= 300 km</Name>
       <Title>unknown mag AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>150</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> mw &lt;= 4 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>17</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 9 &lt; mw AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 300km &lt; depth </Name>
       <Title>unknown mag AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>300</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 300km &lt; depth </Name>
       <Title> mw &lt;= 4 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 300km &lt; depth </Name>
       <Title> 4 &lt; mw &lt;= 5 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 300km &lt; depth </Name>
       <Title> 5 &lt; mw &lt;= 6 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 300km &lt; depth </Name>
       <Title> 6 &lt; mw &lt;= 7 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>17</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 300km &lt; depth </Name>
       <Title> 7 &lt; mw &lt;= 8 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 300km &lt; depth </Name>
       <Title> 8 &lt; mw &lt;= 9 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 300km &lt; depth </Name>
       <Title> 9 &lt; mw AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND unknown depth</Name>
       <Title> mw &lt;= 4 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>

             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND unknown depth</Name>
       <Title> 4 &lt; mw &lt;= 5 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND unknown depth</Name>
       <Title> 5 &lt; mw &lt;= 6 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND unknown depth</Name>
       <Title> 6 &lt; mw &lt;= 7 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>17</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND unknown depth</Name>
       <Title> 7 &lt; mw &lt;= 8 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND unknown depth</Name>
       <Title> 8 &lt; mw &lt;= 9 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>25</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND unknown depth</Name>
       <Title> 9 &lt; mw AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND depth &lt;= 15 km</Name>
       <Title>unknown mag AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND depth &lt;= 15 km</Name>
       <Title> mw &lt;= 4 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND depth &lt;= 15 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND depth &lt;= 15 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND depth &lt;= 15 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND depth &lt;= 15 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND depth &lt;= 15 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND depth &lt;= 15 km</Name>
       <Title> 9 &lt; mw AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>


           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 15km &lt; depth &lt;= 35 km</Name>
       <Title>unknown mag AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>15</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> mw &lt;= 4 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 9 &lt; mw AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 35km &lt; depth &lt;= 70 km</Name>
       <Title>unknown mag AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>35</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> mw &lt;= 4 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 9 &lt; mw AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 70km &lt; depth &lt;= 150 km</Name>
       <Title>unknown mag AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>70</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> mw &lt;= 4 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 9 &lt; mw AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 150km &lt; depth &lt;= 300 km</Name>
       <Title>unknown mag AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>150</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> mw &lt;= 4 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 9 &lt; mw AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 300km &lt; depth </Name>
       <Title>unknown mag AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>300</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 300km &lt; depth </Name>
       <Title> mw &lt;= 4 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 300km &lt; depth </Name>
       <Title> 4 &lt; mw &lt;= 5 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 300km &lt; depth </Name>
       <Title> 5 &lt; mw &lt;= 6 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 300km &lt; depth </Name>
       <Title> 6 &lt; mw &lt;= 7 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 300km &lt; depth </Name>
       <Title> 7 &lt; mw &lt;= 8 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 300km &lt; depth </Name>
       <Title> 8 &lt; mw &lt;= 9 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 300km &lt; depth </Name>
       <Title> 9 &lt; mw AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND unknown depth</Name>
       <Title> mw &lt;= 4 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>

             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND unknown depth</Name>
       <Title> 4 &lt; mw &lt;= 5 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND unknown depth</Name>
       <Title> 5 &lt; mw &lt;= 6 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND unknown depth</Name>
       <Title> 6 &lt; mw &lt;= 7 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND unknown depth</Name>
       <Title> 7 &lt; mw &lt;= 8 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND unknown depth</Name>
       <Title> 8 &lt; mw &lt;= 9 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND unknown depth</Name>
       <Title> 9 &lt; mw AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND depth &lt;= 15 km</Name>
       <Title>unknown mag AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND depth &lt;= 15 km</Name>
       <Title> mw &lt;= 4 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND depth &lt;= 15 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND depth &lt;= 15 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND depth &lt;= 15 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND depth &lt;= 15 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND depth &lt;= 15 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND depth &lt;= 15 km</Name>
       <Title> 9 &lt; mw AND depth &lt;= 15 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>


           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 15km &lt; depth &lt;= 35 km</Name>
       <Title>unknown mag AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>15</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> mw &lt;= 4 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 15km &lt; depth &lt;= 35 km</Name>
       <Title> 9 &lt; mw AND 15km &lt; depth &lt;= 35 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>15</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FCFC00</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 35km &lt; depth &lt;= 70 km</Name>
       <Title>unknown mag AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>35</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> mw &lt;= 4 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 35km &lt; depth &lt;= 70 km</Name>
       <Title> 9 &lt; mw AND 35km &lt; depth &lt;= 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>35</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#03FF03</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 70km &lt; depth &lt;= 150 km</Name>
       <Title>unknown mag AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>70</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> mw &lt;= 4 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 70km &lt; depth &lt;= 150 km</Name>
       <Title> 9 &lt; mw AND 70km &lt; depth &lt;= 150 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 150km &lt; depth &lt;= 300 km</Name>
       <Title>unknown mag AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>150</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> mw &lt;= 4 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 4 &lt; mw &lt;= 5 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 5 &lt; mw &lt;= 6 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 6 &lt; mw &lt;= 7 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 7 &lt; mw &lt;= 8 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 8 &lt; mw &lt;= 9 AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 150km &lt; depth &lt;= 300 km</Name>
       <Title> 9 &lt; mw AND 150km &lt; depth &lt;= 300 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>150</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#0303FF</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>unknown mag AND 300km &lt; depth </Name>
       <Title>unknown mag AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           <ogc:PropertyIsGreaterThan>
                 <ogc:PropertyName>depth</ogc:PropertyName>
                 <ogc:Literal>300</ogc:Literal>
                 </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND 300km &lt; depth </Name>
       <Title> mw &lt;= 4 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>

           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND 300km &lt; depth </Name>
       <Title> 4 &lt; mw &lt;= 5 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND 300km &lt; depth </Name>
       <Title> 5 &lt; mw &lt;= 6 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND 300km &lt; depth </Name>
       <Title> 6 &lt; mw &lt;= 7 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND 300km &lt; depth </Name>
       <Title> 7 &lt; mw &lt;= 8 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND 300km &lt; depth </Name>
       <Title> 8 &lt; mw &lt;= 9 AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
           <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND 300km &lt; depth </Name>
       <Title> 9 &lt; mw AND 300km &lt; depth </Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>300</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FC00FC</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> mw &lt;= 4 AND unknown depth</Name>
       <Title> mw &lt;= 4 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>

             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 4 &lt; mw &lt;= 5 AND unknown depth</Name>
       <Title> 4 &lt; mw &lt;= 5 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>4</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 5 &lt; mw &lt;= 6 AND unknown depth</Name>
       <Title> 5 &lt; mw &lt;= 6 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 6 &lt; mw &lt;= 7 AND unknown depth</Name>
       <Title> 6 &lt; mw &lt;= 7 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>6</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>9</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt; mw &lt;= 8 AND unknown depth</Name>
       <Title> 7 &lt; mw &lt;= 8 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt; mw &lt;= 9 AND unknown depth</Name>
       <Title> 8 &lt; mw &lt;= 9 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>8</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 9 &lt; mw AND unknown depth</Name>
       <Title> 9 &lt; mw AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsEqualTo>
               <ogc:PropertyName>src_id</ogc:PropertyName>
               <ogc:Literal>1</ogc:Literal>
           </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>9</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#ffffff</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
