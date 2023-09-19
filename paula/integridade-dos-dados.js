// requestBody = "Linha=Ano&Coluna=--N%E3o-Ativa--&Arquivos=tb_res_22.dbf&Arquivos=tb_res_21.dbf&Arquivos=tb_res_20.dbf&Arquivos=tb_res_19.dbf&Arquivos=tb_res_18.dbf&Arquivos=tb_res_17.dbf&Arquivos=tb_res_16.dbf&Arquivos=tb_res_15.dbf&Arquivos=tb_res_14.dbf&Arquivos=tb_res_13.dbf&Arquivos=tb_res_12.dbf&Arquivos=tb_res_11.dbf&Arquivos=tb_res_10.dbf&Arquivos=tb_res_09.dbf&Arquivos=tb_res_08.dbf&Arquivos=tb_res_07.dbf&Arquivos=tb_res_06.dbf&Arquivos=tb_res_05.dbf&Arquivos=tb_res_04.dbf&Arquivos=tb_res_03.dbf&Arquivos=tb_res_02.dbf&Arquivos=tb_res_01.dbf&formato=table&mostre=Mostra"
requestBody = "Linha=Tipo_de_atendimento&Coluna=--N%E3o-Ativa--&Arquivos=tb_res_22.dbf&Arquivos=tb_res_21.dbf&Arquivos=tb_res_20.dbf&Arquivos=tb_res_19.dbf&Arquivos=tb_res_18.dbf&Arquivos=tb_res_17.dbf&Arquivos=tb_res_16.dbf&Arquivos=tb_res_15.dbf&Arquivos=tb_res_14.dbf&Arquivos=tb_res_13.dbf&Arquivos=tb_res_12.dbf&Arquivos=tb_res_11.dbf&Arquivos=tb_res_10.dbf&Arquivos=tb_res_09.dbf&Arquivos=tb_res_08.dbf&Arquivos=tb_res_07.dbf&Arquivos=tb_res_06.dbf&Arquivos=tb_res_05.dbf&Arquivos=tb_res_04.dbf&Arquivos=tb_res_03.dbf&Arquivos=tb_res_02.dbf&Arquivos=tb_res_01.dbf&formato=table&mostre=Mostra"

csvLine = `data:text/csv;charset=utf-8,2001;2002;2003;2004;2005;2006;2007;2008;2009;2010;2011;2012;2013;2014;2015;2016;2017;2018;2019;2020;2021;2022`

url = `https://www.ans.gov.br/anstabnet/cgi-bin/tabnet?dados/tabnet_res.def`

incrementos = ["Atendimentos", "Valor_total", "Valor_m%E9dio", "Valor_cobrado", "Valor_pago", "Quantidade_cobrada", "Quantidade_paga", "Dias_de_perman%EAncia_AIH", "M%E9dia_de_perman%EAncia_AIH"]

function main() {
    for (i in incrementos) {

        console.log(incrementos[i])

        var xhr = new XMLHttpRequest();
        var parser = new DOMParser();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {

            } else if (xhr.readyState == 4) {
                console.log("HTTP returned error code", xhr.status)
            }
        }

        //adicionar conforme disponibilidade
        body = `Incremento=${incrementos[i]}`
        parameters = `${body}&${requestBody}`

        console.log(body, parameters);

        xhr.open("POST", url, false);
        xhr.send(parameters);

        

        tab = parser.parseFromString(xhr.response, "text/html")
        console.log(tab)
        csvLine += `\n${incrementos[i]};`

        for (j = 1; j < 23; j++) {
            k = tab.querySelectorAll("tr")[j].children[1].innerText.replace(/\D/g,"")

            csvLine += `${k};`
        }
    }
}