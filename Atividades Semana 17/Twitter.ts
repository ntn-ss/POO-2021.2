class Controller{
    nextTweetId: number = 0;
    users: Map<string, User>;
    tweets: Map<number, Tweet>;

    constructor(){
        this.users = new Map<string, User>();
        this.tweets = new Map<number, Tweet>();
    }
    
    public addUser(username: string): boolean{
        if(!this.users.has(username)){
            let novoUser = new User(username);
            this.users.set(username, novoUser);
            return true;
        }
        else{
            console.log("Fail: usuário já existe!");
            return false;
        }
    }

    public getUser(username: string){
        if(this.users.has(username)){
            let user = this.users.get(username);
            return user;
        }
        else{
            console.log("Fail: usuário não encontrado!");
            return;
        }
    }

    public follow(seguidor: string, seguido: string){
        if(this.users.has(seguidor)&&this.users.has(seguido)){
            let seguidorObj = this.users.get(seguidor);
            let seguidoObj = this.users.get(seguido);
            seguidorObj!.follow(seguidoObj!);
        }
        else{
            console.log("Fail: um dos dois não existe!");
        }
    }  

    public unfollow(seguidor: string, seguido: string){
        if(this.users.has(seguidor)&&this.users.has(seguido)){
            let seguidorObj = this.users.get(seguidor);
            let seguidoObj = this.users.get(seguido);
            seguidorObj!.unfollow(seguidoObj!);
        }
        else{
            console.log("Fail: um dos dois não existe!");
        }
    }

    private createTweet(sender: string, msg: string): Tweet{
            let tuite = new Tweet(this.nextTweetId, sender, msg);
            this.tweets.set(this.nextTweetId, tuite);
            this.nextTweetId++;
            return tuite;
    }

    public sendTweet(username: string, msg: string){
            if(this.users.has(username)){
                let tuiteiro = this.getUser(username);
                let tuitada = this.createTweet(username, msg);
                tuiteiro!.sendTweet(tuitada);
            }
            else{
                console.log("Fail: usuário não encontrado!");
            }
    }

    public sendRt(username: string, idTw: number, msg: string){
            if(this.users.has(username)){
                let tuiteiro = this.getUser(username);
                let tuitada = tuiteiro!.getTuiteEspecifico(idTw);
                let erreTeZada = this.createTweet(username, msg);
                tuitada!.setRt(erreTeZada);
                tuiteiro!.sendTweet(erreTeZada);
            }
            else{
                console.log("Fail: usuário não encontrado!");
            }
    }

    public showTimeLine(username: string){
        if(this.users.has(username)){
            let inboques = this.getUser(username);
            console.log(inboques!.getTimeLine());
        }
        else{
            console.log("Fail: usuário não encontrado!");
        }
    }

    public like(username: string, idTw: number){
        if(this.users.has(username)){
            let gostador = this.getUser(username);
            gostador!.like(idTw);
        }
        else{
            console.log("Fail: usuário não encontrado!");
            return;
        }
    }

    public rmUser(username: string){
        if(this.users.has(username)){
            let apagado = this.getUser(username);
            apagado!.removeAll();
            apagado!.rejectAll();
            apagado!.sumirDoMapa();
            this.users.delete(username);
        }
        else{
            console.log("Fail: usuário não encontrado!");
        }
    }

    toString(){
        let str='';
        for (let user of this.users.values()){
            str+=user.toString();
            str+="\n\n";
        }
        return str;
    }
}

class User{
    private username: string;
    private inbox: Inbox;
    private followers: Map<string, User>;
    private following: Map<string, User>;

    constructor(username: string){
        this.username = username;
        this.followers = new Map<string, User>();
        this.following = new Map<string, User>();
        this.inbox = new Inbox();
    }
    
    public getUsername = (): string => this.username;
    public getSeguidores = (): Array<string> => [...this.followers.keys()];
    public getSeguidos = (): Array<string> => [...this.following.keys()];
    public getTimeLine = () => this.inbox.getTimeLine();
    
    public getTuiteEspecifico(twId: number){
        let retorna = this.inbox.getTweet(twId);
        return retorna;
    }

    public follow(other: User){
        if (other!=this&&!this.following.has(other.getUsername())){
            this.following.set(other.getUsername(), other);
            other.followers.set(this.getUsername(), this);
        }
    }

    public unfollow(other: User){
        if (other!=this&&this.following.has(other.getUsername())){
            this.inbox.removeAllFrom(other);
            this.following.delete(other.getUsername());
            other.followers.delete(this.getUsername());
        }
    }


    public sendTweet(tw: Tweet){
        this.inbox.storeInTimeLine(tw);
        this.inbox.putInMyTweets(tw);

        for (let [, follower] of this.followers){
            follower.inbox.storeInTimeLine(tw);
        }
    }

    public like(idTw: number){
        let likado = this.inbox.getTweet(idTw);
        likado!.addLike(this.getUsername());
    }

    public removeAll(){
        for(let seguido of this.following.values()){
            this.unfollow(seguido);
        }
    }

    public sumirDoMapa(){
        this.inbox.deleteAllMyTweets();
    }

    public rejectAll(){
        for(let seguidor of this.followers.values()){
            seguidor.unfollow(this);
        }
    }

    public toString(): string{
        return `${this.getUsername()}\nSeguidores: [ ${this.getSeguidores().join(", ")} ]\nSeguidos: [ ${this.getSeguidos().join(", ")} ]`;
    }
}

class Tweet{
    private id: number;
    private username: string;
    private msg: string;
    private likes: Array<String>;
    private rt: Array<Tweet>;
    private deleted: boolean = false;

    constructor(id: number, username: string, msg: string){
        this.id=id;
        this.username=username;
        this.msg=msg;
        this.likes=[];
        this.rt=[];
        this.deleted;
    }

    public getId = (): number => this.id;
    public getUsername = (): string => this.username;
    public getMsg = (): string => this.msg;
    public getLikes = (): Array<String> => this.likes;

    public addLike(nick: string){
        this.likes.push(nick);
    }

    public setRt(tw: Tweet){
        this.rt.push(tw);
    }

    public setDeleted(){
        this.deleted=true;
    }
    
    public isDeleted = (): boolean => this.deleted;

    public toString(): string{
        let str = '';
        
        if(this.deleted==true){
            str+="Este tuíte foi REMOVIDO.";
        }
        else if (this.rt.length!=0&&this.likes.length!=0){
            str += this.id+": " + this.username + " ("+this.msg+")"+"\nLikes: "+this.likes+"."+"\nRTs: "+this.rt+".\n";
        }
        else if (this.likes.length!=0){
            str += this.id+": " + this.username + " ("+this.msg+")"+"\nLikes: "+this.likes+".\n";
        }
        else if (this.rt.length!=0){
            str += this.id+": " + this.username + " ("+this.msg+")"+"\nRTs: "+this.rt+"."+"\n";
        }
        else{
            str += this.id+": " + this.username + " ("+this.msg+").\n";
        }
        
        return str;
    }
}

class Inbox{
    private timeline: Map<number, Tweet>;
    private myTweets: Map<number, Tweet>;

    constructor(){
        this.timeline = new Map<number, Tweet>();
        this.myTweets = new Map<number, Tweet>();
    }

    public getTweet(twId: number): Tweet|undefined{
        if (this.timeline.has(twId)){
            let retornoTuite = this.timeline.get(twId);
            return retornoTuite;
        }
        else{
            console.log("Tuíte não encontrado!")
            return;
        }
    }

    public putInMyTweets(tweet: Tweet){
        this.myTweets.set(tweet.getId(), tweet);
    }

    public storeInTimeLine(tweet: Tweet){
        this.timeline.set(tweet.getId(), tweet);
    }

    public getTimeLine(): string{
        let str = "";
        
        let array = Array.from(this.timeline.values()).reverse();
        for(let tweet of array){
            str+=tweet.toString();
            str+="\n";
        }

        return str;
    }
    public getMyTweets(): string{
        let str = "";
        
        let array = Array.from(this.myTweets.values()).reverse()
        for(let tweet of array){
            str+=tweet.toString();
            str+="\n";
        }

        return str;
    }

    public deleteAllMyTweets(){
        for (let tweet of this.myTweets.values()){
            tweet.setDeleted();
        }
    }

    removeAllFrom(other: User){
        for (let tweet of this.timeline.values()){
            if (tweet.getUsername()==other.getUsername()){
                this.timeline.delete(tweet.getId());
            }
        }
    }
}

function main(){
    let twitter = new Controller();

    twitter.addUser("goku");
    twitter.addUser("vegeta");
    twitter.addUser("nappa");
    twitter.addUser("kuririn");
    twitter.addUser("gohan");

    twitter.follow("vegeta", "nappa");
    twitter.follow("nappa", "vegeta");
    twitter.follow("gohan", "goku");
    twitter.follow("gohan", "kuririn");
    twitter.follow("kuririn", "gohan");
    twitter.follow("kuririn", "goku");

    twitter.sendTweet("nappa", "Por favor, diga logo qual é o poder de luta do Kakaroto!");
    twitter.sendRt("vegeta", 0, "Grr... é de mais de OITO MIL!");
    twitter.like("nappa", 1);
    twitter.sendTweet("gohan", "PAPAI.");
    twitter.sendTweet("kuririn", "Ressuscita-me.");

    twitter.like("kuririn", 3);

    twitter.showTimeLine("nappa");
    twitter.showTimeLine("kuririn");
    console.log(twitter.toString());

    twitter.sendTweet("goku", "KAIOKEN!");
    twitter.rmUser("nappa");

    twitter.showTimeLine("vegeta");

    console.log(twitter.toString());
}

main();