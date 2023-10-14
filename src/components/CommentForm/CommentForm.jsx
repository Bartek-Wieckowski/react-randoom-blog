import "./comment-form.scss";

export default function CommentForm() {
  return (
    <div className="comment-form">
      <h3>Dodaj swój komentarz</h3>
      <form action="">
        <div className="wrapper">
          <p>
            <input type="text" placeholder="Imię" required />
          </p>
          <p>
            <input type="email" placeholder="Email" />
          </p>
        </div>
        <p className="co-textarea">
          <textarea placeholder="Wpisz swój komentarz" rows="10"></textarea>
        </p>
        {/* //TODO: do zrobienia dla zarejestrowanych uzytkownikow  */}
        {/* <p className="co-cookies">
      <input type="checkbox" id="cookies" />
      <label for="cookies">Zapisz mój komentarz</label>
    </p> */}
        <p className="co-submit">
          <input type="submit" value="Wyślij" className="btn submit read-more" />
        </p>
      </form>
    </div>
  );
}
