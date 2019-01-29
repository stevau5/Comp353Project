# SSH Into School Computers
**Using some software like [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) or plain terminal:**

`$ ssh <your-own-encs-username>@login.encs.concordia.ca`

`enter password: <your-own-encs-password>`

you should now be connected to the schools computers.

**Change directory into our group directory:**

`$ cd ../../../groups/u/up_comp353_4`

**Run mysql:**

`$ mysql -h upc353.encs.concordia.ca -u upc353_4 -p upc353_4`

`enter password: <our-mysql-password>`

mysql should now be running. type `help` for a list of commands, `exit` to quit, or try some queries:

```sql
show tables;
select * from Student;
select * from Department;
```
