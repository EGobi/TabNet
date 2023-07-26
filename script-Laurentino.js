requestBody = `Linha=Unidade_da_Federa%E7%E3o&Coluna=--N%E3o-Ativa--&Incremento=Interna%E7%F5es&SRegi%E3o=TODAS_AS_CATEGORIAS__&pesqmes2=Digite+o+texto+e+ache+f%E1cil&SUnidade_da_Federa%E7%E3o=TODAS_AS_CATEGORIAS__&SCar%E1ter_atendimento=TODAS_AS_CATEGORIAS__&SRegime=TODAS_AS_CATEGORIAS__&pesqmes5=Digite+o+texto+e+ache+f%E1cil&SCap%EDtulo_CID-10=TODAS_AS_CATEGORIAS__&pesqmes6=&pesqmes7=Digite+o+texto+e+ache+f%E1cil&SFaixa_Et%E1ria_1=TODAS_AS_CATEGORIAS__&pesqmes8=Digite+o+texto+e+ache+f%E1cil&SFaixa_Et%E1ria_2=TODAS_AS_CATEGORIAS__&SSexo=TODAS_AS_CATEGORIAS__&SCor%2Fra%E7a=TODAS_AS_CATEGORIAS__&formato=table&mostre=Mostra`

csvLine = `data:text/csv;charset=utf-8,Ano;Mês;Estado;Hipertensão;Hipercolesterolernia;Diabetes;Asma;Osteoporose;Rinite;Parkinson;Glaucoma\r\n`

url = `http://tabnet.datasus.gov.br/cgi/tabcgi.exe?sih/cnv/nrbr.def`

anos = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

arquivo = `&Arquivos=nruf2301.dbf`

hipertensao = `&SLista_Morb__CID-10=169&SLista_Morb__CID-10=170`
arterosclerose = `&SLista_Morb__CID-10=181`
diabetes = `&SLista_Morb__CID-10=124`
asma = `&SLista_Morb__CID-10=200`
osteoporose = `&SLista_Morb__CID-10=234`
rinite = `&SLista_Morb__CID-10=196`
parkinson = `&SLista_Morb__CID-10=145`
glaucoma = `&SLista_Morb__CID-10=159`

function loadTab(url, parameters) {
    var xhr = new XMLHttpRequest();
    var parser = new DOMParser();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {

        } else if (xhr.readyState == 4) {
            console.log("HTTP returned error code", xhr.status)
        }
    }

    xhr.open("POST", url, false);
    xhr.send(parameters);

    tab = parser.parseFromString(xhr.response, "text/html")
}

function main() {
    for (a in anos) {
        for (m in meses) {
            console.log(anos[a], meses[m])
            arquivoArg = `&Arquivos=nruf${anos}${meses}.dbf`
            parameters = requestBody + arquivoArg

            loadTab(url, parameters + hipertensao)
        }
    }
}

main()