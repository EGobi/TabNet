requestBody = "Linha=Ano%2Fm%EAs_atendimento&Coluna=Regi%E3o&pesqmes2=Digite+o+texto+e+ache+f%E1cil&SUnidade_da_Federa%E7%E3o=TODAS_AS_CATEGORIAS__&SCar%E1ter_atendimento=TODAS_AS_CATEGORIAS__&SRegime=TODAS_AS_CATEGORIAS__&pesqmes5=Digite+o+texto+e+ache+f%E1cil&SCap%EDtulo_CID-10=TODAS_AS_CATEGORIAS__&pesqmes6=Digite+o+texto+e+ache+f%E1cil&SLista_Morb__CID-10=194&pesqmes7=Digite+o+texto+e+ache+f%E1cil&pesqmes8=Digite+o+texto+e+ache+f%E1cil&SFaixa_Et%E1ria_2=TODAS_AS_CATEGORIAS__&SCor%2Fra%E7a=TODAS_AS_CATEGORIAS__&formato=table&mostre=Mostra"

incrementos = [
"Interna%E7%F5es",
"AIH_aprovadas",
"Valor_total",
"Valor_servi%E7os_hospitalares",
"Valor_m%E9dio_AIH",
"Valor_m%E9dio_intern",
"Dias_perman%EAncia",
"M%E9dia_perman%EAncia",
"%D3bitos",
"Taxa_mortalidade"
]

csvLine = `data:text/csv;charset=utf-8,Faixa Etária;Sexo;Ano/mês antendimento;Região;Internações;AIH aprovadas;Valor total;Valor serviços hospitalares;Valor médio AIH;Valor médio intern;Dias permanência;Média permanência;Óbitos;Taxa mortalidade\r\n`;

anos = ["12", "13", "14", "15", "16", "17", "18", "19", "20", "21"]
meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
regioes = ["1", "2", "3", "4", "5"] // incluir 6? (ignorado/exterior)
sexos = ["1", "2", "3"]
faixas = ["1", "2"]

url = `http://tabnet.datasus.gov.br/cgi/tabcgi.exe?sih/cnv/niuf.def`
//incremento = `Incremento=${incrementoA}&`

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

dictFaixas = {
    "1": "Menor 1 ano",
    "2": "1 a 4 anos"
}

dictSexos = {
    "1": "Masc",
    "2": "Fem",
    "3": "Ign"
}

dictRegioes = {
    "1": "Norte",
    "2": "Nordeste",
    "3": "Sudeste",
    "4": "Sul",
    "5": "Centro-Oeste"
}

function loadTab(incremento) {
    incremento = `Incremento=${incremento}&`
    fullArgumentsText = incremento + arquivo + regiao + faixa + sexo + requestBody;

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
    csvLine += `${dictFaixas[fai]};${dictSexos[sex]};01/${mes}/${ano};${dictRegioes[reg]};`
}

function getValues() {
    tableRows = tab.getElementsByTagName("tr")
    value = "-"

    for (i = 1; i < tableRows.length; i++) { // pula i = 0, já que o mês aparece como descrição nesse <tr>
        if (tableRows[i].children[0].innerText.includes(mesAbbr[mes])) {
            value = tableRows[i].getElementsByTagName("td")[1].innerText;
        }
    }

    csvLine += `${value};`
}

function main() {
    for (a in anos) {
        ano = anos[a]

        for (m in meses) {
            mes = meses[m]
            arquivo = `Arquivos=niuf${ano}${mes}.dbf&`

            for (r in regioes) {
                reg = regioes[r]
                regiao = `SRegi%E3o=${reg}&`

                for (f in faixas) {
                    fai = faixas[f]
                    faixa = `SFaixa_Et%E1ria_1=${fai}&`

                    for (s in sexos) {
                        sex = sexos[s]
                        sexo = `SSexo=${sex}&`

                        startLine();

                        for (i in incrementos) {
                            loadTab(incrementos[i])
                            getValues()
                        }

                        csvLine += `\r\n`
                    }
                }
            }
        }
    }

    return csvLine
}