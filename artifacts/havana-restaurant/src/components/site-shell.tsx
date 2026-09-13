import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, Menu, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { logo } from './site-assets';
import { facebook, instagram, phone, whatsapp, MenuItem } from '@/data/content';

export type CartLine = MenuItem & { quantity: number };
export type CartProps = { cart: CartLine[]; add: (item: MenuItem) => void; change: (id: string, amount: number) => void; remove: (id: string) => void; clear: () => void };

export function Intro() {
  const [visible, setVisible] = useState(true);
  useEffect(() => { const timer = window.setTimeout(() => setVisible(false), 1750); return () => window.clearTimeout(timer); }, []);
  if (!visible) return null;
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#17120f] transition-opacity duration-500">
    <div className="text-center">
      <img src={logo} alt="لافا" className="intro-logo mx-auto h-44 w-44 rounded-full object-cover shadow-2xl shadow-orange-950/50" />
      <div className="mt-6 overflow-hidden"><div className="intro-line h-px w-40 bg-[#f6c85f]" /></div>
      <p className="mt-4 text-[11px] tracking-[.45em] text-[#f5eee1]/65" dir="ltr">QUALITY IN OUR INGREDIENTS</p>
    </div>
  </div>;
}

export function SiteShell({ children, cart, add, change, remove, clear }: CartProps & { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  return <div className="grain min-h-[100dvh] bg-[#17120f] text-[#f5eee1]">
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#17120f]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3" data-testid="link-logo">
          <img src={logo} alt="لافا" className="h-12 w-12 rounded-full object-cover ring-1 ring-[#f6c85f]/30" />
          <span className="hidden text-left leading-none sm:block"><b className="block text-lg tracking-[.28em]" dir="ltr">LAVA</b><small className="text-[9px] tracking-[.23em] text-[#f6c85f]" dir="ltr">EST. 2022</small></span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-[#f5eee1]/70 lg:flex">
          {[['/', 'الرئيسية'], ['/menu', 'القائمة'], ['/branches', 'فروعنا'], ['/reviews', 'آراء الناس'], ['/contact', 'تواصل معنا']].map(([href, label]) =>
            <Link key={href} href={href} data-testid={`link-nav-${label}`} className={`transition-colors hover:text-[#f6c85f] ${location === href ? 'text-[#f6c85f]' : ''}`}>{label}</Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:${phone}`} className="hidden items-center gap-2 text-xs text-[#f5eee1]/65 hover:text-[#f6c85f] md:flex" dir="ltr" data-testid="link-call-header"><span className="h-2 w-2 rounded-full bg-[#77a66b]" /> {phone}</a>
          <button onClick={() => setOpen(true)} className="relative flex h-11 items-center gap-2 rounded-full bg-[#ef6a35] px-4 text-sm font-bold text-[#17120f] transition-transform hover:-translate-y-0.5" data-testid="button-open-cart">
            <ShoppingBag size={17} /><span className="hidden sm:inline">طلبك</span>{count > 0 && <b className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f6c85f] px-1 text-[11px]">{count}</b>}
          </button>
          <button onClick={() => setMobile(!mobile)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden" aria-label="فتح القائمة" data-testid="button-mobile-menu">{mobile ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </div>
      {mobile && <nav className="border-t border-white/10 bg-[#211914] px-5 py-4 lg:hidden">
        {['/', '/menu', '/branches', '/reviews', '/contact'].map((href, i) => <Link onClick={() => setMobile(false)} key={href} href={href} className="block border-b border-white/10 py-3 text-sm text-[#f5eee1]/75" data-testid={`link-mobile-${i}`}>{['الرئيسية', 'القائمة', 'فروعنا', 'آراء الناس', 'تواصل معنا'][i]}</Link>)}
      </nav>}
    </header>
    <main className="pt-[76px]">{children}</main>
    <footer className="border-t border-white/10 bg-[#17120f]">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div><img src={logo} alt="لافا" className="mb-5 h-16 w-16 rounded-full object-cover" /><p className="max-w-xs text-sm leading-7 text-[#f5eee1]/55">أكل له شخصية. مكونات بنحبها، وصفات بنفتخر بيها، ولمة تستاهل تتكرر.</p></div>
        <div><h3 className="mb-5 text-sm font-bold text-[#f6c85f]">اختصارات</h3><div className="grid gap-3 text-sm text-[#f5eee1]/60"><Link href="/menu" data-testid="link-footer-menu">شوف القائمة</Link><Link href="/branches" data-testid="link-footer-branches">أقرب فرع ليك</Link><Link href="/reviews" data-testid="link-footer-reviews">شوف الناس بتقول إيه</Link></div></div>
        <div><h3 className="mb-5 text-sm font-bold text-[#f6c85f]">خليك قريب</h3><div className="grid gap-3 text-sm text-[#f5eee1]/60"><a href={instagram} target="_blank" rel="noreferrer" data-testid="link-footer-instagram">Instagram</a><a href={facebook} target="_blank" rel="noreferrer" data-testid="link-footer-facebook">Facebook</a><a href={`tel:${phone}`} dir="ltr" data-testid="link-footer-phone">{phone}</a></div></div>
      </div><div className="border-t border-white/10 py-5 text-center text-[11px] text-[#f5eee1]/35">لافا — معمول بحب · المنصورة، مصر</div>
    </footer>
    {open && <CartDrawer cart={cart} add={add} change={change} remove={remove} clear={clear} close={() => setOpen(false)} />}
  </div>;
}

function CartDrawer({ cart, change, remove, clear, close }: CartProps & { close: () => void }) {
  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' });
  const [error, setError] = useState('');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) { setError('من فضلك اكتب الاسم، رقم الهاتف، والعنوان.'); return; }
    const lines = cart.map(item => `${item.name} × ${item.quantity} = ${item.price * item.quantity} ج.م`).join('\n');
    const text = `طلب جديد من موقع لافا\n\n${lines}\n\nالإجمالي: ${total} ج.م\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالعنوان: ${form.address}\nملاحظات: ${form.notes || 'لا يوجد'}`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };
  return <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" onClick={close}>
    <aside onClick={e => e.stopPropagation()} className="absolute right-0 top-0 h-full w-full max-w-[470px] overflow-y-auto bg-[#211914] p-5 shadow-2xl sm:p-8">
      <div className="mb-8 flex items-center justify-between"><div><p className="text-xs text-[#f6c85f]">طلبك جاهز؟</p><h2 className="mt-1 text-2xl font-bold">شنطتك</h2></div><button onClick={close} className="rounded-full border border-white/15 p-2" aria-label="إغلاق" data-testid="button-close-cart"><X size={18} /></button></div>
      {!checkout ? <>{cart.length === 0 ? <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center"><ShoppingBag className="mx-auto mb-4 text-[#f6c85f]" size={30} /><p className="font-bold">الشنطة لسه فاضية</p><p className="mt-2 text-sm text-[#f5eee1]/50">اختار حاجة من القائمة وخليها تبدأ.</p><Link href="/menu" onClick={close} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#ef6a35]" data-testid="link-cart-menu">روح للقائمة <ArrowLeft size={16} /></Link></div> : <><div className="space-y-3">{cart.map(item => <div key={item.id} className="flex gap-3 rounded-xl border border-white/10 bg-[#17120f] p-3" data-testid={`cart-line-${item.id}`}><img src={item.image} alt="" className="h-16 w-16 rounded-lg object-cover" /><div className="min-w-0 flex-1"><p className="font-bold">{item.name}</p><p className="text-xs text-[#f6c85f]">{item.price} ج.م</p><div className="mt-2 flex items-center gap-2"><button onClick={() => change(item.id, -1)} className="rounded-md border border-white/15 p-1" data-testid={`button-decrease-${item.id}`}><Minus size={12} /></button><span className="min-w-4 text-center text-xs">{item.quantity}</span><button onClick={() => change(item.id, 1)} className="rounded-md border border-white/15 p-1" data-testid={`button-increase-${item.id}`}><Plus size={12} /></button><button onClick={() => remove(item.id)} className="mr-auto text-xs text-[#f5eee1]/40 hover:text-[#ef6a35]" data-testid={`button-remove-${item.id}`}>حذف</button></div></div></div>)}</div><div className="mt-8 border-t border-white/10 pt-5"><div className="mb-5 flex justify-between text-lg font-bold"><span>الإجمالي</span><span className="text-[#f6c85f]" dir="ltr">{total} ج.م</span></div><button onClick={() => setCheckout(true)} className="w-full rounded-full bg-[#ef6a35] py-4 font-bold text-[#17120f] hover:bg-[#f6c85f]" data-testid="button-checkout">كمل الطلب على واتساب <ArrowLeft className="mr-2 inline" size={17} /></button><button onClick={clear} className="mt-3 w-full text-xs text-[#f5eee1]/40" data-testid="button-clear-cart">إفراغ الشنطة</button></div></>}</> : <form onSubmit={submit} className="space-y-4"><button type="button" onClick={() => setCheckout(false)} className="mb-2 text-sm text-[#f6c85f]" data-testid="button-back-cart">رجوع للطلب</button><p className="mb-5 text-sm leading-6 text-[#f5eee1]/60">اكتب بياناتك، وهنفتحلك محادثة واتساب بالطلب جاهز للإرسال.</p>{[['name','الاسم بالكامل','اكتب اسمك'],['phone','رقم الهاتف','01xxxxxxxxx'],['address','العنوان','المنطقة، الشارع، رقم البيت']].map(([key,label,placeholder]) => <label key={key} className="block text-sm"><span className="mb-2 block text-[#f5eee1]/70">{label}</span><input required={key !== 'notes'} value={form[key as keyof typeof form]} onChange={e => setForm({...form, [key]: e.target.value})} placeholder={placeholder} className="w-full rounded-xl border border-white/15 bg-[#17120f] px-4 py-3 text-sm placeholder:text-[#f5eee1]/25" data-testid={`input-order-${key}`} /></label>)}<label className="block text-sm"><span className="mb-2 block text-[#f5eee1]/70">ملاحظات <small>(اختياري)</small></span><textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="أي حاجة تحب تقولها للمطبخ؟" className="min-h-24 w-full resize-none rounded-xl border border-white/15 bg-[#17120f] px-4 py-3 text-sm placeholder:text-[#f5eee1]/25" data-testid="input-order-notes" /></label>{error && <p className="text-sm text-[#ef6a35]" data-testid="status-order-error">{error}</p>}<button type="submit" className="mt-3 w-full rounded-full bg-[#f6c85f] py-4 font-bold text-[#17120f]" data-testid="button-send-whatsapp">افتح واتساب وأرسل الطلب</button></form>}
    </aside>
  </div>;
}