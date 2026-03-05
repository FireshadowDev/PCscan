using UnityEngine;

public class BotonCompra : MonoBehaviour{

    // URL de la tienda para el ratón ATK VXE R1 Pro
    public string urlCompra = "https://vxe.com/products/vxe-dragonfly-r1-series-wireless-mouse?variant=47700096909526";

    // Este método se activa al tocar el ratón en el móvil o hacer clic en el PC
    void OnMouseDown()
    {
        Application.OpenURL(urlCompra);
        Debug.Log("Redirigiendo a la tienda oficial...");
    }
}
