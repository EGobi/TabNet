requestBody = "Linha=Munic%EDpio&Coluna=--N%E3o-Ativa--&Incremento=Qtd.aprovada&pesqmes1=Digite+o+texto+e+ache+f%E1cil&SMunic%EDpio=TODAS_AS_CATEGORIAS__&SRegi%E3o_de_Sa%FAde_%28CIR%29=TODAS_AS_CATEGORIAS__&SMacrorregi%E3o_de_Sa%FAde=TODAS_AS_CATEGORIAS__&SDivis%E3o_administ_estadual=TODAS_AS_CATEGORIAS__&SMicrorregi%E3o_IBGE=TODAS_AS_CATEGORIAS__&SRegi%E3o_Metropolitana_-_RIDE=TODAS_AS_CATEGORIAS__&pesqmes7=Digite+o+texto+e+ache+f%E1cil&SProcedimento=3&SGrupo_procedimento=TODAS_AS_CATEGORIAS__&pesqmes9=Digite+o+texto+e+ache+f%E1cil&SSubgrupo_proced.=TODAS_AS_CATEGORIAS__&pesqmes10=Digite+o+texto+e+ache+f%E1cil&SForma_organiza%E7%E3o=TODAS_AS_CATEGORIAS__&SComplexidade=1&SFinanciamento=TODAS_AS_CATEGORIAS__&pesqmes13=Digite+o+texto+e+ache+f%E1cil&SRubrica_FAEC=TODAS_AS_CATEGORIAS__&pesqmes14=Digite+o+texto+e+ache+f%E1cil&SRegra_contratual=TODAS_AS_CATEGORIAS__&SCar%E1ter_Atendiment=TODAS_AS_CATEGORIAS__&SGest%E3o=TODAS_AS_CATEGORIAS__&SDocumento_registro=TODAS_AS_CATEGORIAS__&SEsfera_administrat=TODAS_AS_CATEGORIAS__&STipo_de_prestador=TODAS_AS_CATEGORIAS__&pesqmes20=Digite+o+texto+e+ache+f%E1cil&SNatureza_Jur%EDdica=TODAS_AS_CATEGORIAS__&pesqmes21=Digite+o+texto+e+ache+f%E1cil&SEsfera_Jur%EDdica=TODAS_AS_CATEGORIAS__&SAprova%E7%E3o_produ%E7%E3o=TODAS_AS_CATEGORIAS__&pesqmes23=Digite+o+texto+e+ache+f%E1cil&SProfissional_-_CBO=531&formato=table&mostre=Mostra"

csvLine = `data:text/csv;charset=utf-8,Ano;Mês;Estado;Município;Quantidade aprovada\r\n`;

url = "http://tabnet.datasus.gov.br/cgi/tabcgi.exe?sia/cnv/qa"

anos  = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
estados = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]

function loadTab(url_uf, parameters) {
    var xhr = new XMLHttpRequest();
    var parser = new DOMParser();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {

        } else if (xhr.readyState == 4) {
            console.log("HTTP returned error code", xhr.status)
        }
    }

    xhr.open("POST", url_uf, false);
    xhr.send(parameters);

    tab = parser.parseFromString(xhr.response, "text/html")
}

function getValues() {
    table = tab.getElementsByTagName("tbody")[0]
    tableRows = table.getElementsByTagName("tr")
    col_municipio = "-"
    col_qtdaprovada = "0"

    for (i = 1; i < tableRows.length; i++) { // pula i = 0, já que o total aparece
        col_municipio = tableRows[i].getElementsByTagName("td")[0].innerText.trim() // nessa tabela, precisamos do trim() para remover um \n ao lado do nome do município
        col_qtdaprovada = tableRows[i].getElementsByTagName("td")[1].innerText.trim()
        csvLine += `${anos[a]};${meses[m]};${estados[e]};${col_municipio};${col_qtdaprovada}\r\n`
    }
}

function main() {
    for (a in anos) {
        ano = anos[a]
        for (m in meses) {
            mes = meses[m]
            console.log(anos[a], meses[m])
            
            for (e in estados) {
                estado = estados[e]
                arquivoArg = `&Arquivos=qa${estado}${ano}${mes}.dbf`
                url_uf = url + estado + ".def"
                parameters = requestBody + arquivoArg

                loadTab(url_uf, parameters);
                getValues();
            }
        }
    }
}

main()