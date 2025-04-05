using UnityEngine;

public class controler : MonoBehaviour
{
    public float speed = 5f;
    public float gravity = -9.81f;

    private CharacterController controller;
    private Vector3 velocity; // Aqui está a variável declarada corretamente

    void Start()
    {
        controller = GetComponent<CharacterController>();
    }

    void Update()
    {
        float moveX = Input.GetAxis("Horizontal");
        float moveZ = Input.GetAxis("Vertical");

        Vector3 move = transform.right * moveX + transform.forward * moveZ;
        controller.Move(move * speed * Time.deltaTime);

        // Aplicando gravidade
        if (!controller.isGrounded)
        {
            velocity.y += gravity * Time.deltaTime;
        }
        else
        {
            velocity.y = -2f; // Pequeno valor negativo para manter no chão
        }

        controller.Move(velocity * Time.deltaTime); // Aplicação da gravidade
    }
}
