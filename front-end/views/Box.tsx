const Box = Fc.pure(() => {
    const mesh = new Three.Mesh(new Three.BoxGeometry(1, 1, 1), new Three.MeshNormalMaterial())

    return mesh
})

export default Box

// return (
//     <mesh
//         {...props}
//         ref={ref}
//         scale={active ? 1.5 : 1}
//         onClick={(): void => setActive(!active)}
//         onPointerOver={(): void => setHover(true)}
//         onPointerOut={(): void => setHover(false)}
//     >
//         <boxGeometry args={[1, 1, 1]} />
//         <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
//     </mesh>
// )
