<#list features as feature>
    <div>
        <span class="x-panel-header-text">${feature.fid}</span>
        <table width="100%">
            <#list feature.attributes as attribute>
                <#if !attribute.isGeometry>
                    <tr>
                        <td style="border: 1px solid black; padding: 2px;" width="50%">${attribute.name}</td>
                        <#if attribute.name == "en">
                             <td style="border: 1px solid black; padding: 2px;" width="50%"><a target="_blank" href="http://emidius.eu/GEH/info/?en=${attribute.value}">${attribute.value}</a></td>
                        <#else>
                            <td style="border: 1px solid black; padding: 2px;" width="50%">${attribute.value}</td>
                        </#if>
                    </tr>
                </#if>
            </#list>
        </table>
    </div>
    <br />

</#list>
