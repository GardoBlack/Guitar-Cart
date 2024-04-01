export default function Guitar({ guitar, addToCart }) {
  //Destructoring props
  const { id, name, image, description, price } = guitar;

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`/img/${image}.jpg`}
          alt="imagen guitarra"
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">{price}</p>
        <button
          type="button"
          className="btn btn-dark w-100"
          onClick={() => addToCart(guitar)}
          // onClick={() => handleClick(guitar)}
        >
          Agregar al Carrito
        </button>

        <button
          type="button"
          className="btn btn-outline-dark w-100 mt-2 text-uppercase"
        >
          Cantidad : {guitar.quantity ? guitar.quantity : 0}
        </button>
      </div>
    </div>
  );
}
