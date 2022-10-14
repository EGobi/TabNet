requestBody = "SGrupo_procedimento=TODAS_AS_CATEGORIAS__&pesqmes6=Digite+o+texto+e+ache+f%E1cil&SSubgrupo_proced.=TODAS_AS_CATEGORIAS__&pesqmes7=Digite+o+texto+e+ache+f%E1cil&SForma_organiza%E7%E3o=TODAS_AS_CATEGORIAS__&SComplexidade=TODAS_AS_CATEGORIAS__&SFinanciamento=TODAS_AS_CATEGORIAS__&pesqmes10=Digite+o+texto+e+ache+f%E1cil&SRubrica_FAEC=TODAS_AS_CATEGORIAS__&pesqmes11=Digite+o+texto+e+ache+f%E1cil&SRegra_contratual=TODAS_AS_CATEGORIAS__&SNatureza=TODAS_AS_CATEGORIAS__&SRegime=TODAS_AS_CATEGORIAS__&pesqmes14=Digite+o+texto+e+ache+f%E1cil&SNatureza_jur%EDdica=TODAS_AS_CATEGORIAS__&pesqmes15=Digite+o+texto+e+ache+f%E1cil&SEsfera_jur%EDdica=TODAS_AS_CATEGORIAS__&SGest%E3o=TODAS_AS_CATEGORIAS__&formato=table&mostre=Mostra"

// Request body values
linha = "Linha=Ano%2Fm%EAs_atendimento&";
coluna = "Coluna=Regi%E3o&";
formato = "&formato=table";

incrementoSihA = "AIH_aprovadas";
incrementoSihB = "Valor_total";
incrementoSihC = "M%E9dia_perman%EAncia";
incrementoSiaA = "Qtd.aprovada";
incrementoSiaB = "Valor_aprovado";

csvLine = `data:text/csv;charset=utf-8,;;SIH;;;;;;;;;;;;;;;SIA\r\n;;${incrementoSihA};;;;;${incrementoSihB};;;;;${incrementoSihC};;;;;${incrementoSiaA};;;;;${incrementoSiaB}\r\n;;N;NE;SE;S;CO;N;NE;SE;S;CO;N;NE;SE;S;CO;N;NE;SE;S;CO;N;NE;SE;S;CO\r\n`;

producaoSih = "i"
producaoSia = "a"
anos = ["22"]
meses = ["01", "02", "03", "04", "05", "06"]

url = `http://tabnet.datasus.gov.br/cgi/tabcgi.exe?sih/cnv/q${producaoSih}uf.def`
incremento = `Incremento=${incrementoSihA}&`

/* SIH */
procedimentoLista = ["1531", "2066", "2067", "2717", "2718"] // 0303060301, 0309070015, 0309070023, 0406020566 SIH, 0406020574 SIH

/* SIA */
//procedimentoLista = ["1547", "2088", "2089"]

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

mesAbbr = {
    "01": "Jan",
    "02": "Fev",
    "03": "Mar",
    "04": "Abr",
    "05": "Mai",
    "06": "Jun",
    "07": "Jul",
    "08": "Ago",
    "09": "Set",
    "10": "Out",
    "11": "Nov",
    "12": "Dez"
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

function startLine() {
    csvLine += `01/${mes}/${ano};${procedimentoNome[procedimentoId]};`
}

function getValues() {
    tableRows = tab.getElementsByTagName("tr")
    valueLine = "-;-;-;-;-"

    for (i = 1; i < tableRows.length; i++) { // pula i = 0, já que o mês aparece como descrição nesse <tr>
        if (tableRows[i].children[0].innerText.includes(mesAbbr[mes])) {
            tableData = tableRows[i].getElementsByTagName("td");

            dataRegioes = new Array(5).fill("-")

            // excessões em que só uma coluna é mostrada
            cabmeio = tab.getElementsByClassName("cabmeio")
            
            for (w = 0; w < cabmeio.length; w++) {
                if (cabmeio[w] != undefined) {
                    if (cabmeio[w].innerText.includes("Norte")) {
                        dataRegioes[0] = tableData[w+1].innerText;
                    } else if (cabmeio[w].innerText.includes("Nordeste")) {
                        dataRegioes[1] = tableData[w+1].innerText;
                    } else if (cabmeio[w].innerText.includes("Sudeste")) {
                        dataRegioes[2] = tableData[w+1].innerText;
                    } else if (cabmeio[w].innerText.includes("Sul")) {
                        dataRegioes[3] = tableData[w+1].innerText;
                    } else if (cabmeio[w].innerText.includes("Centro-Oeste")) {
                        dataRegioes[4] = tableData[w+1].innerText;
                    } else { 
                        console.log("Erro:", tableData[w+1].innerText, "não reconhecido")
                    }
                }
            }

            valueLine = `${dataRegioes[0]};${dataRegioes[1]};${dataRegioes[2]};${dataRegioes[3]};${dataRegioes[4]}`
            

        }
    }

    csvLine += `${valueLine};`
}

function jumpLine() {
    csvLine += "\r\n";
}

function main() {
    procedimentoLista = ["1531", "2066", "2067", "2717", "2718"]

    for (a in anos) {
        ano = anos[a]
        for (m in meses) {
            mes = meses[m]

            for (procedimento in procedimentoLista) {
                procedimentoId = procedimentoLista[procedimento]
                //console.log(procedimentoId)
                console.log(mes, ano)
                procedimentoArg = `SProcedimento=${procedimentoId}&`
                startLine();

                url = `http://tabnet.datasus.gov.br/cgi/tabcgi.exe?sih/cnv/q${producaoSih}uf.def`
                arquivo = `Arquivos=q${producaoSih}uf${ano}${mes}.dbf&`
                
                incremento = `Incremento=${incrementoSihA}&`
                loadTab(procedimentoArg);
                getValues();

                incremento = `Incremento=${incrementoSihB}&`
                loadTab(procedimentoArg);
                getValues();

                incremento = `Incremento=${incrementoSihC}&`
                loadTab(procedimentoArg);
                getValues();
            
                procedimentoLista = ["1547", "2088", "2089"]
                procedimentoId = procedimentoLista[procedimento]
                //console.log(procedimentoId)
                if (procedimentoId) {
                    procedimentoArg = `SProcedimento=${procedimentoId}&`

                    url = `http://tabnet.datasus.gov.br/cgi/tabcgi.exe?sia/cnv/q${producaoSia}uf.def`
                    arquivo = `Arquivos=q${producaoSia}uf${ano}${mes}.dbf&`

                    incremento = `Incremento=${incrementoSiaA}&`
                    loadTab(procedimentoArg);
                    getValues();
                    
                    incremento = `Incremento=${incrementoSiaB}&`
                    loadTab(procedimentoArg);
                    getValues();

                }
                jumpLine();
                procedimentoLista = ["1531", "2066", "2067", "2717", "2718"]
            }
        }
            procedimentoLista = ["1531", "2066", "2067", "2717", "2718"]
    }
    return csvLine
}

// window.open(encodeURI(csvLine))