# SSH Into School Computers
**Using some software like [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) or plain terminal:**

`$ ssh <your-own-encs-username>@login.encs.concordia.ca`

`enter password: <your-own-encs-password>`

You should now be connected to the schools computers.

**Change directory into our group directory:**

`$ cd ../../../groups/u/up_comp353_4`

**Run mysql:**

`$ mysql -h upc353.encs.concordia.ca -u upc353_4 -p upc353_4`

`enter password: <our-mysql-password>`

mysql should now be running. type `help` for a list of commands, `exit` to quit, or try some queries:

```sql
show tables;
select * from table_name;
```


# Connect MySQL Workbench to production database
**Using [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) software:**

Open up MySQL Workbench and in the top menu click `database` > `connect to database`.

You should see a window asking for you for information to setup a new connection. Edit the following:

Connection Method: `Standard TCP/IP over SSH`

SSH Hostname: `login.encs.concordia.ca`

SSH Username: `your encs username`

SSH Password: click `Store In Vault ...` and enter `your encs password`

MYSQL Hostname: `upc353.encsconcordia.ca`

MYSQL Server Port: `3306`

Username: `our groups username`

Password: `our groups password`

Default Schema: `our groups username`


Click `Test Connection` or hit apply when done. Double click the connection to open it.
