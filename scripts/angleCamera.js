
class AngleCameraController {
    
    constructor(camera, centerObject, radius = 15)
    {
        this.camera = camera;
        this.scene = scene;
        this.currentDeg = 0;
        this.radius = radius;
        this.speed = 1;
        this.centerObject = centerObject;
        this.onCameraPosUpdate = undefined;

        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    getPoint(deg) {
        let rad = deg * Math.PI / 180;
        return {x: this.radius * Math.cos(rad), y: this.radius * Math.sin(rad)};
    }

    setCamToCurrentDeg()
    {
        if (this.currentDeg < 0)
        {
            this.currentDeg += 360;
        }
        let point = this.getPoint(this.currentDeg);
        camera.position.set(point.y, 0, point.x);
    }

    update()
    {
        this.setCamToCurrentDeg();
        this.camera.lookAt(this.centerObject.position);

        if (this.onCameraPosUpdate != undefined) this.onCameraPosUpdate(this.currentDeg);
    }

    onKeyDown(e)
    {
        switch (e.key)
        {
            case "ArrowRight":
            {
                this.currentDeg += this.speed;
                this.update();
                break;
            }
            case "ArrowLeft":
            {
                this.currentDeg -= this.speed;
                this.update();
                break;
            }
            case "ArrowUp":
            {
                this.speed++;
                break;
            }
            case "ArrowDown":
            {
                if (this.speed == 1) break;
                this.speed--;
                break;
            }
        }
    }

}