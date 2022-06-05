requestBody = "SGrupo_procedimento=TODAS_AS_CATEGORIAS__&pesqmes6=Digite+o+texto+e+ache+f%E1cil&SSubgrupo_proced.=TODAS_AS_CATEGORIAS__&pesqmes7=Digite+o+texto+e+ache+f%E1cil&SForma_organiza%E7%E3o=TODAS_AS_CATEGORIAS__&SComplexidade=TODAS_AS_CATEGORIAS__&SFinanciamento=TODAS_AS_CATEGORIAS__&pesqmes10=Digite+o+texto+e+ache+f%E1cil&SRubrica_FAEC=TODAS_AS_CATEGORIAS__&pesqmes11=Digite+o+texto+e+ache+f%E1cil&SRegra_contratual=TODAS_AS_CATEGORIAS__&SNatureza=TODAS_AS_CATEGORIAS__&SRegime=TODAS_AS_CATEGORIAS__&pesqmes14=Digite+o+texto+e+ache+f%E1cil&SNatureza_jur%EDdica=TODAS_AS_CATEGORIAS__&pesqmes15=Digite+o+texto+e+ache+f%E1cil&SEsfera_jur%EDdica=TODAS_AS_CATEGORIAS__&SGest%E3o=TODAS_AS_CATEGORIAS__&formato=table&mostre=Mostra"
csvLine = new Array()
csvLine["2101"] = "data:text/csv;charset=utf-8,";

// Request body values
linha = "Linha=Ano%2Fm%EAs_atendimento&"
coluna = "Coluna=Regi%E3o&"
formato = "&formato=table"

incrementoSihA = "AIH_aprovadas"
incrementoSihB = "Valor_total"
incrementoSihC = "M%E9dia_perman%EAncia"
incrementoSiaA = "Qtd.aprovada"
incrementoSiaB = "Valor_aprovado"

producaoSih = "i"
producaoSia = "a"
ano = "17"
mes = "01"

url = `http://tabnet.datasus.gov.br/cgi/tabcgi.exe?sia/cnv/q${producaoSia}uf.def`
incremento = `Incremento=${incrementoSiaB}&`
arquivo = `Arquivos=q${producaoSia}uf${ano}${mes}.dbf&`

/* SIH */
//procedimentoLista = ["1531", "2066", "2067", "2717", "2718"] // 0303060301, 0309070015, 0309070023, 0406020566 SIH, 0406020574 SIH

/* SIA */
procedimentoLista = ["1547", "2088", "2089"]

procedimentoNome = {
    1531: "TRATAMENTO DE VARIZES DOS MEMBROS INFERIORES C/ ULCERA",
    2066: "TRATAMENTO ESCLEROSANTE NÃO ESTÉTICO DE VARIZES DOS MEMBROS INFERIORES (UNILATERAL)",
    2067: "TRATAMENTO ESCLEROSANTE NÃO ESTÉTICO DE VARIZES DOS MEMBROS INFERIORES (BILATERAL)",
    2717: "TRATAMENTO CIRÚRGICO DE VARIZES (BILATERAL)",
    2718: "TRATAMENTO CIRÚRGICO DE VARIZES (UNILATERAL)",

    1547: "TRATAMENTO DE VARIZES DOS MEMBROS INFERIORES C/ ULCERA",
    2088: "TRATAMENTO ESCLEROSANTE NÃO ESTÉTICO DE VARIZES DOS MEMBROS INFERIORES (UNILATERAL)",
    2089: "TRATAMENTO ESCLEROSANTE NÃO ESTÉTICO DE VARIZES DOS MEMBROS INFERIORES (BILATERAL)"
}

function loadTab(procedimentoArg) {
    fullArgumentsText = linha + coluna + incremento + arquivo + procedimentoArg + formato;

    var xhr = new XMLHttpRequest();
    var parser = new DOMParser();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //console.log("Done");
        } else if (xhr.readyState == 4) {
            console.log("HTTP returned error code", xhr.status);
        }
    }

    xhr.open("POST", url, false);
    xhr.send(fullArgumentsText);

    tab = parser.parseFromString(xhr.response, "text/html");
}

function getValues() {
    tableRows = tab.getElementsByTagName("tr")
    valueLine = "-;-;-;-;-"

    for (i = 1; i < tableRows.length; i++) { // pula i = 0, já que o mês aparece como descrição nesse <tr>
        if (tableRows[i].children[0].innerText.includes("Jan")) {
            tableData = tableRows[i].getElementsByTagName("td");
            valueLine = `${tableData[1].innerText};${tableData[2].innerText};${tableData[3].innerText};${tableData[4].innerText};${tableData[5].innerText}`
        }
    }

    csvLine["2101"] += `${procedimentoNome[procedimentoId]};${valueLine}\r\n`

    //console.log(csvLine["2101"])
}

function main() {
    for (procedimento in procedimentoLista) {
        procedimentoId = procedimentoLista[procedimento]
        procedimentoArg = `SProcedimento=${procedimentoId}&`
        loadTab(procedimentoArg);
        getValues();
    }

    return csvLine["2101"]
}

//  window.open(encodeURI(csvLine["2101"]))