import requests

#url = "https://www.ans.gov.br/anstabnet/cgi-bin/tabnet?dados/tabnet_res.def"
url = "https://www.ans.gov.br/anstabnet/cgi-bin/dh?dados/tabnet_res.def"
user_agent = {
    "Host": "www.ans.gov.br",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Cookie": "",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1"
    }

f = open("C:\\Users\\EGobi\\OneDrive\\Documentos\\ANS TabNet\\2022 - Teste.csv", "r")

array = []

f.readline()
for line in f:
    array.append(line.split(";")[:6])

print(array)

for i in array:
    ano = i[0]
    uf = i[1]
    tipo_de_atendimento = i[2]
    sexo = i[3]
    tipo_de_contratacao = i[4]
    abrangencia_geografica = i[5]

    params = {
        "Linha": "Ano",
        "Coluna": "Segmenta%E7%E3o_grupo",
        "Incremento": "Atendimentos",
        "Arquivos": "tb_res_{}.dbf".format(ano),
        "SUF": uf,
        "STipo_de_atendimento": tipo_de_atendimento,
        "SSexo": sexo,
        "STipo_de_contrata%E7%E3o": tipo_de_contratacao,
        "SAbrang%EAncia_geog.": abrangencia_geografica,
        "formato": "table",
        "mostre": "Mostra"
    }

    req = requests.get(url, user_agent)
    print(req.content)