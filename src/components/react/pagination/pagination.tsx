import { useEffect, useState } from "react";

//Style
const pagination = {
  padding: "18px",
  margin: "15px 0",
  display: "flex",
  justifyContent: "center",
};

const pagination__span = {
  padding: "15px 20px",
  border: "1px solid gray",
  cursor: "pointer",
};

// const Pagination = () => {
//   const [paginationData, setPaginationData] = useState<
//     { title: string; thumbnail: string }[]
//   >([]);
//   const [page, setPage] = useState(1);

//   //Fetch the product list
//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await fetch("https://dummyjson.com/products?limit=50");
//         const data = await response.json();
//         const mapedData = data?.products.map((item: any) => {
//           return {
//             title: item.title,
//             thumbnail: item.thumbnail,
//           };
//         });
//         setPaginationData(mapedData);
//       } catch (error) {}
//     })();
//   }, []);

//   //Pagination handler
//   const paginationHandler = (selectedPage: number) => {
//     if (
//       selectedPage > 0 &&
//       selectedPage <= Math.ceil(paginationData.length / 6) &&
//       selectedPage !== page
//     )
//       setPage(selectedPage);
//   };

//   return (
//     <div style={{ marginTop: "200px", textAlign: "center" }}>
//       <h4>Pagination</h4>
//       {paginationData.length > 0 && (
//         <div
//           style={{
//             display: "grid",
//             margin: "28px",
//             padding: "0",
//             gap: "14px",
//             gridTemplateColumns: "1fr 1fr 1fr",
//           }}
//         >
//           {paginationData.slice(page * 6 - 6, page * 6).map((item) => (
//             <span
//               key={item.title}
//               style={{
//                 height: "150px",
//                 padding: "28px",
//                 backgroundColor: "rgb(220,220,220)",
//                 textAlign: "center",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 fontSize: "14px",
//               }}
//             >
//               <img
//                 src={item.thumbnail}
//                 alt={item.title}
//                 style={{
//                   width: "100%",
//                   height: "90%",
//                   objectFit: "cover",
//                   marginBottom: "2px",
//                 }}
//               />
//               <span>{item.title}</span>
//             </span>
//           ))}
//         </div>
//       )}
//       <div style={pagination}>
//         <span
//           style={
//             page > 1
//               ? pagination__span
//               : { ...pagination__span, pointerEvents: "none", opacity: "2" }
//           }
//           onClick={() => paginationHandler(page - 1)}
//         >
//           ◀
//         </span>
//         {[...Array(Math.ceil(paginationData.length / 6))].map((_, index) => (
//           <span
//             key={index}
//             style={
//               index + 1 === page
//                 ? { ...pagination__span, backgroundColor: "gray" }
//                 : pagination__span
//             }
//             onClick={() => paginationHandler(index + 1)}
//           >
//             {index + 1}
//           </span>
//         ))}

//         <span
//           style={
//             page < paginationData.length / 6
//               ? pagination__span
//               : { ...pagination__span, pointerEvents: "none" }
//           }
//           onClick={() => paginationHandler(page + 1)}
//         >
//           ▶
//         </span>
//       </div>
//     </div>
//   );
// };
const Pagination = () => {
    const [paginationData, setPaginationData] = useState<
      { title: string; thumbnail: string }[]
    >([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
  
    // Fetch the product list
    useEffect(() => {
      (async () => {
        try {
          const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 6 - 6}`);
          const data = await response.json();
          const mappedData = data?.products.map((item: any) => ({
            title: item.title,
            thumbnail: item.thumbnail,
          }));
          setPaginationData(mappedData);
          setTotal(Math.ceil(data.total / 6));
        } catch (error) {
          console.error(error);
        }
      })();
    }, [page]);
  
    // Pagination handler
    const paginationHandler = (selectedPage: number) => {
      if (selectedPage > 0 && selectedPage <= total && selectedPage !== page)
        setPage(selectedPage);
    };
  
    // Pagination logic for rendering
    const renderPagination = () => {
      const pages = [];
      const startPage = Math.max(1, page - 4);
      const endPage = Math.min(total, page + 5);
  
      // First 5 pages
      for (let i = 1; i <= Math.min(5, total); i++) {
        pages.push(i);
      }
  
      // Middle dots
      if (startPage > 6) {
        pages.push('...');
      }
  
      // Pages in the middle
      for (let i = startPage; i <= endPage; i++) {
        if (i > 5 && i < total - 4) {
          pages.push(i);
        }
      }
  
      // Last 5 pages
      if (endPage < total - 4) {
        pages.push('...');
      }
  
      for (let i = Math.max(total - 4, 6); i <= total; i++) {
        pages.push(i);
      }
  
      return pages;
    };
  
    return (
      <div style={{ marginTop: "200px", textAlign: "center" }}>
        <h4>Pagination</h4>
        {paginationData.length > 0 && (
          <div
            style={{
              display: "grid",
              margin: "28px",
              padding: "0",
              gap: "14px",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            {paginationData.map((item) => (
              <span
                key={item.title}
                style={{
                  height: "150px",
                  padding: "28px",
                  backgroundColor: "rgb(220,220,220)",
                  textAlign: "center",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "90%",
                    objectFit: "cover",
                    marginBottom: "2px",
                  }}
                />
                <span>{item.title}</span>
              </span>
            ))}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%', // Fixed width for pagination
            maxWidth:"80%",
            margin: '20px auto', // Center the box
            height: '50px', // Fixed height for pagination
            border: '1px solid #ccc', // Optional: add a border for clarity
            borderRadius: '4px', // Optional: add some rounding to the corners
            overflow: 'hidden', // Prevent overflow
          }}
        >
          <span
            style={page > 1 ? pagination__span : { ...pagination__span, pointerEvents: "none", opacity: "0.5" }}
            onClick={() => paginationHandler(page - 1)}
          >
            ◀
          </span>
          {renderPagination().map((item, index) => (
            <span
              key={index}
              style={item === page ? { ...pagination__span, backgroundColor: "gray" } : pagination__span}
              onClick={() => typeof item === 'number' && paginationHandler(item)}
            >
              {item}
            </span>
          ))}
          <span
            style={page < total ? pagination__span : { ...pagination__span, pointerEvents: "none", opacity: "0.5" }}
            onClick={() => paginationHandler(page + 1)}
          >
            ▶
          </span>
        </div>
      </div>
    );
  };

export default Pagination;
