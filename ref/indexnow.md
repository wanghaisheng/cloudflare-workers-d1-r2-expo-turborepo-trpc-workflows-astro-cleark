
聊聊IndexNow快速收录：

我们向搜索引擎提交收录通常是通过sitemap来提交，或者是在gsc、bing后台一条一条网址提交。

sitemap提交后，搜索引擎会不定期来爬这个sitemap，然后发现新的url放入爬取池里，这种方式因为不知道搜索引擎什么时候回来爬取，所以收录会不及时。

而Bing和Yandax联合推出了IndexNow机制来解决及时收录的问题。具体也就是在网站有内容更新的时候，我们主动调用某个接口告知搜索引擎，我们的网站哪些url变化了，这样搜索引擎也就可以第一时间知道网站内容更新了。

我一开始觉得没必要提交IndexNow，毕竟我自己手动在GSC和bing后台提交了，也提交了sitemap。而实际上，除了bing、google，其实还有一些小众的搜索引擎流量还是不错的，特别是在小语种国家，比如俄罗斯的Yandex以及其他的一些小的搜索引擎，我们提交了IndexNow后，实际上相当于同步提交到了这些搜索引擎。

那么，我们具体怎么实现IndexNow的提交？其实很简单：

①在https://www.bing.com/indexnow/getstarted 生成api key
②在网站根目录放{api key}.txt文件，文件里包含api key。
③调用post请求，将你网站的新增或者改动的url提交过去。

我代码里有两个脚本，一个是生成sitemap，一个是提交IndexNow，生成完sitemap后，提交IndexNow脚本会读取sitemap里的url，自动提交IndexNow。