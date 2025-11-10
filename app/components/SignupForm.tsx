// app/(site)/components/SignupForm.tsx  (of op je home direct)
export default function SignupForm() {
    return (
      <form method="POST" action="/api/apply" className="mt-8 grid gap-3 max-w-xl">
        <div className="grid md:grid-cols-2 gap-3">
          <input name="companyName" placeholder="Bedrijfsnaam" required className="border rounded-md px-3 py-2" />
          <input name="contactName" placeholder="Contactpersoon" required className="border rounded-md px-3 py-2" />
        </div>
        <input name="address" placeholder="Adres" required className="border rounded-md px-3 py-2" />
        <div className="grid md:grid-cols-3 gap-3">
          <input name="postalCode" placeholder="Postcode" required className="border rounded-md px-3 py-2" />
          <input name="city" placeholder="Plaats" required className="border rounded-md px-3 py-2" />
          <input type="email" name="email" placeholder="E-mail" required className="border rounded-md px-3 py-2" />
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <input name="kvk" placeholder="KVK-nummer" required className="border rounded-md px-3 py-2" />
          <input name="btw" placeholder="BTW-nummer" required className="border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="mr-3 text-sm">Gekozen pakket:</label>
          <select name="plan" className="border rounded-md px-3 py-2" required>
            <option value="BASIC">Basic</option>
            <option value="PLUS">Plus</option>
            <option value="PRO">Pro</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 rounded-md text-white" style={{backgroundColor:"#2F6B4F"}}>
          Aanmelden
        </button>
      </form>
    );
  }
  