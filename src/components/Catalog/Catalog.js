
import CatalogItem from "./CatalogItem/CatalogItem";

const Catalog = (props) => {
    return (
        <section id="catalog-page">
            <h1>{props.title}</h1>

            {props.items.length > 0
                ? props.items.map(x => <CatalogItem key={x._id} collectionItem={x} itemType={props.itemsType} />)
                : <h3 className="no-articles">No articles yet</h3>
            }
        </section>
    );
};

export default Catalog;
